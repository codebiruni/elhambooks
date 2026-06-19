import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_ACCESS_TOKEN

// Meta requires PII fields (phone, email, name, etc.) to be SHA-256 hashed,
// lowercased, and trimmed before sending
function hashField(value: string): string {
    return crypto
        .createHash('sha256')
        .update(value.trim().toLowerCase())
        .digest('hex')
}

// Bangladeshi numbers need a country code (88) prefix for Meta's matching,
// and no leading zero/plus/spaces
function normalizePhone(phone: string): string {
    const digitsOnly = phone.replace(/\D/g, '')
    // If it's an 11-digit local number starting with 01, prepend 88
    if (digitsOnly.startsWith('01') && digitsOnly.length === 11) {
        return `88${digitsOnly}`
    }
    return digitsOnly
}

export async function POST(req: NextRequest) {
    if (!PIXEL_ID || !ACCESS_TOKEN) {
        console.error('Meta CAPI: Missing PIXEL_ID or ACCESS_TOKEN env vars')
        return NextResponse.json(
            { error: 'Server misconfigured' },
            { status: 500 }
        )
    }

    try {
        const body = await req.json()
        const {
            eventName,
            eventId,
            value,
            currency,
            products,
            userData,
        } = body

        // Get client IP and user agent for better event matching
        const forwardedFor = req.headers.get('x-forwarded-for')
        const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : req.headers.get('x-real-ip') || ''
        const userAgent = req.headers.get('user-agent') || ''

        const hashedUserData: Record<string, string> = {}

        if (userData?.ph) {
            hashedUserData.ph = hashField(normalizePhone(userData.ph))
        }
        if (userData?.fn) {
            hashedUserData.fn = hashField(userData.fn)
        }
        if (clientIp) {
            hashedUserData.client_ip_address = clientIp
        }
        if (userAgent) {
            hashedUserData.client_user_agent = userAgent
        }

        const payload = {
            data: [
                {
                    event_name: eventName || 'Purchase',
                    event_time: Math.floor(Date.now() / 1000),
                    event_id: eventId, // must match the browser-side eventID for dedup
                    action_source: 'website',
                    user_data: hashedUserData,
                    custom_data: {
                        value,
                        currency,
                        content_type: 'product',
                        contents: products?.map((p: { id: string; quantity: number }) => ({
                            id: p.id,
                            quantity: p.quantity,
                        })),
                    },
                },
            ],
        }

        const response = await fetch(
            `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        )

        const result = await response.json()

        if (!response.ok) {
            console.error('Meta CAPI error:', result)
            return NextResponse.json({ error: result }, { status: response.status })
        }

        return NextResponse.json({ success: true, result })
    } catch (error) {
        console.error('Meta CAPI route error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}