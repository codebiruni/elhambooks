import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, CheckCircle } from 'lucide-react'

interface OrderFormData {
  name: string
  number: string
  district: string
  upazilla: string
  union: string // This field now securely represents Village / Ward / Area Address
  note: string
  paymentMethod: 'cash-on-delivery'
}

interface ShippingFormProps {
  formData: OrderFormData
  onInputChange: (field: keyof OrderFormData, value: string) => void
  deliveryCharge: number
  grandTotal: number
  loading: boolean
  onSubmitOrder: () => void
  isFormValid: boolean
}

// District values used for each zone.
// IMPORTANT: the parent uses /dhaka|ঢাকা/i to compute deliveryCharge.
// 'ঢাকা'      → matches → 70৳  (inside)
// 'বাহিরে'    → no match → 90৳ (outside) — no latin 'dhaka' in this string
const INSIDE_DISTRICT = 'ঢাকা'
const INSIDE_UPAZILLA = 'ঢাকা'
const OUTSIDE_DISTRICT = 'বাহিরে'   // pure Bangla, will NOT match /dhaka|ঢাকা/i
const OUTSIDE_UPAZILLA = 'বাহিরে'

export default function ShippingForm({
  formData,
  onInputChange,
  deliveryCharge,
  grandTotal,
  loading,
  onSubmitOrder,
  isFormValid
}: ShippingFormProps) {
  // Safe check: matches parent's /dhaka|ঢাকা/i regex
  const isInsideDhaka = /dhaka|ঢাকা/i.test(formData.district)
  const hasSelectedZone = formData.district !== ''

  const selectOutside = () => {
    onInputChange('district', OUTSIDE_DISTRICT)
    onInputChange('upazilla', OUTSIDE_UPAZILLA)
  }

  const selectInside = () => {
    onInputChange('district', INSIDE_DISTRICT)
    onInputChange('upazilla', INSIDE_UPAZILLA)
  }

  return (
    <div style={{ backgroundColor: '#eef0f5', minHeight: '100vh', padding: '24px 16px', fontFamily: 'inherit' }}>

      {/* Page Heading */}
      <h2 style={{ color: '#1a8a3c', fontSize: '20px', fontWeight: '700', marginBottom: '24px', lineHeight: '1.4' }}>
        আপনার ডেলিভারি ঠিকানা দিন
      </h2>

      {/* Full Name */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#1a1a1a' }}>
          আপনার নামঃ <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <Input
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="আপনার পূর্ণ নাম লিখুন"
          required
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid #d0d3dc',
            borderRadius: '6px',
            height: '48px',
            fontSize: '15px',
            padding: '0 12px',
            boxShadow: 'none',
          }}
          className="focus:ring-0 focus:border-gray-400"
        />
      </div>

      {/* Address — maps to `union` (Village / Ward / Area Address) */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#1a1a1a' }}>
          ঠিকানাঃ <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <Input
          value={formData.union}
          onChange={(e) => onInputChange('union', e.target.value)}
          placeholder="গ্রাম, থানা এবং জেলা"
          required
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid #d0d3dc',
            borderRadius: '6px',
            height: '48px',
            fontSize: '15px',
            padding: '0 12px',
            boxShadow: 'none',
          }}
          className="focus:ring-0 focus:border-gray-400"
        />
      </div>

      {/* Phone Number */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#1a1a1a' }}>
          ফোন নাম্বারঃ <span style={{ color: '#e53e3e' }}>*</span>
        </label>
        <Input
          value={formData.number}
          onChange={(e) => onInputChange('number', e.target.value)}
          placeholder="01XXXXXXXXX"
          pattern="01[3-9]\d{8}"
          required
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid #d0d3dc',
            borderRadius: '6px',
            height: '48px',
            fontSize: '15px',
            padding: '0 12px',
            boxShadow: 'none',
          }}
          className="focus:ring-0 focus:border-gray-400"
        />
      </div>

      {/* Order Note */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#1a1a1a' }}>
          অর্ডার নোট (ঐচ্ছিক)
        </label>
        <Textarea
          value={formData.note}
          onChange={(e) => onInputChange('note', e.target.value)}
          placeholder="বিশেষ কোনো নির্দেশনা থাকলে লিখুন..."
          rows={2}
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            border: '1px solid #d0d3dc',
            borderRadius: '6px',
            fontSize: '15px',
            padding: '10px 12px',
            boxShadow: 'none',
            resize: 'none',
          }}
          className="focus:ring-0 focus:border-gray-400"
        />
      </div>

      {/* Shipping Zone */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1a1a1a', marginBottom: '12px' }}>
          Shipping
        </h3>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #d0d3dc', borderRadius: '8px', overflow: 'hidden' }}>

          {/* Outside Dhaka — 90৳ */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 14px',
              borderBottom: '1px solid #e5e7eb',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="radio"
                name="shippingZone"
                checked={hasSelectedZone && !isInsideDhaka}
                onChange={selectOutside}
                style={{ accentColor: '#e53e3e', width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '15px', color: '#1a1a1a' }}>ঢাকার বাহিরে:</span>
            </div>
            <span style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: '500' }}>90 ৳</span>
          </label>

          {/* Inside Dhaka — 70৳ */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 14px',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="radio"
                name="shippingZone"
                checked={hasSelectedZone && isInsideDhaka}
                onChange={selectInside}
                style={{ accentColor: '#e53e3e', width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '15px', color: '#1a1a1a' }}>ঢাকার ভিতরে:</span>
            </div>
            <span style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: '500' }}>70 ৳</span>
          </label>
        </div>

        {/* Delivery charge preview — updates live with radio */}
        {hasSelectedZone && (
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '13px', color: '#1a6e30' }}>
              ⚡ ১ ঘন্টার মধ্যে ফোনে কনফার্মেশন পাবেন
            </p>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a1a' }}>
              ডেলিভারি চার্জ: {deliveryCharge} ৳
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        onClick={onSubmitOrder}
        disabled={loading || !isFormValid}
        style={{
          width: '100%',
          height: '52px',
          fontSize: '16px',
          fontWeight: '700',
          backgroundColor: '#1a8a3c',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: loading || !isFormValid ? 'not-allowed' : 'pointer',
          opacity: loading || !isFormValid ? 0.65 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            অর্ডার প্রক্রিয়া হচ্ছে...
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5 mr-2" />
            অর্ডার করুন — {grandTotal} ৳
          </>
        )}
      </Button>

      {/* Payment method note */}
      <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '13px', color: '#6b7280' }}>
        💵 ক্যাশ অন ডেলিভারি — পণ্য পেয়ে পেমেন্ট করুন
      </p>

    </div>
  )
}