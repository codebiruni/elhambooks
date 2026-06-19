/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import useContextData from "@/defaults/custom-component/useContextData"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import OrderSuccessModal from './OrderSuccessModal'
import EmptyCart from './EmptyCart'
import OrderSummary from './OrderSummery'
import ShippingForm from './ShippingForm'

interface OrderFormData {
  name: string
  number: string
  district: string
  upazilla: string
  union: string // This field represents Village / Ward / Area Address
  note: string
  paymentMethod: 'cash-on-delivery'
}

interface PurchaseItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartProduct {
  product: {
    id: string
  }
  expiresAt: number
  quantity: number
}

interface WishlistProduct {
  product: {
    id: string
  }
  expiresAt: number
}

export default function PurchaseProducts() {
  const { purchasesData, handlePurchasedData, handleAddCart, handleAddWishlist } = useContextData()
  const [loading, setLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState<string>('')
  const router = useRouter()
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    number: '',
    district: '',
    upazilla: '',
    union: '', // Used for Village / Ward / Area Address
    note: '',
    paymentMethod: 'cash-on-delivery'
  })

  const [itemsWithQuantity, setItemsWithQuantity] = useState<PurchaseItem[]>([])

  // Clean purchasesData on every render to remove any functions
  const cleanPurchasesData = Array.isArray(purchasesData)
    ? purchasesData.filter(item =>
      item &&
      typeof item === 'object' &&
      item.id &&
      typeof item.id === 'string'
    )
    : []

  useEffect(() => {
    console.log('Current purchasesData:', purchasesData)
    console.log('Clean purchasesData:', cleanPurchasesData)

    if (cleanPurchasesData.length > 0) {
      const initializedItems = cleanPurchasesData.map((item: any) => ({
        ...item,
        quantity: item.quantity || 1
      }))
      setItemsWithQuantity(initializedItems)
    } else {
      setItemsWithQuantity([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchasesData])

  const subtotal = itemsWithQuantity.reduce((sum: number, item: PurchaseItem) =>
    sum + (item.price * item.quantity), 0)

  const deliveryCharge = formData.district ?
    (/dhaka|ঢাকা/i.test(formData.district) ? 70 : 90) : 0
  const discount = 0
  const grandTotal = subtotal + deliveryCharge - discount

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setItemsWithQuantity(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleRemoveItem = (id: string) => {

    // 1. Remove from local state
    const updatedItems = itemsWithQuantity.filter(item => item.id !== id)
    setItemsWithQuantity(updatedItems)

    // 2. Remove from global state - SIMPLIFIED
    const updatedPurchases = cleanPurchasesData.filter((item: any) => {
      console.log('Checking item:', item.id, 'against:', id)
      return item.id !== id
    })

    console.log('Updated purchases after removal:', updatedPurchases)
    handlePurchasedData(updatedPurchases)

    // 3. Remove from storage
    removeProductsFromStorage([id])

    console.log('Removal completed')
  }

  const removeProductsFromStorage = (productIds: string[]) => {
    // Remove from cart
    const cartExisting = localStorage.getItem("cartProducts")
    if (cartExisting) {
      const cartProducts: CartProduct[] = JSON.parse(cartExisting)
      const now = Date.now()
      const validProducts = cartProducts.filter((item) => item.expiresAt > now)

      const updatedCartProducts = validProducts.filter(
        (item) => !productIds.includes(item.product.id)
      )

      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts))
      handleAddCart(updatedCartProducts)
    }

    // Remove from wishlist
    const wishlistExisting = localStorage.getItem("WishlistProducts")
    if (wishlistExisting) {
      const wishlistProducts: WishlistProduct[] = JSON.parse(wishlistExisting)
      const now = Date.now()
      const validProducts = wishlistProducts.filter((item) => item.expiresAt > now)

      const updatedWishlistProducts = validProducts.filter(
        (item) => !productIds.includes(item.product.id)
      )

      localStorage.setItem("WishlistProducts", JSON.stringify(updatedWishlistProducts))
      handleAddWishlist(updatedWishlistProducts)
    }
  }

  const trackPurchaseEvent = async (eventId: string) => {
    if (typeof window === 'undefined') return;

    for (let attempt = 0; attempt < 20; attempt += 1) {
      if (typeof window.fbq !== 'undefined') {
        const payload = {
          value: grandTotal,
          currency: 'BDT',
          content_type: 'product',
          contents: itemsWithQuantity.map(item => ({
            id: item.id,
            quantity: item.quantity
          }))
        }
        console.log('🔥 PURCHASE PAYLOAD:', JSON.stringify(payload))
        window.fbq('track', 'Purchase', payload, { eventID: eventId })
        return
      }

      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  const handleSubmitOrder = async () => {
    const requiredFields = [
      { field: 'name', label: 'Full Name' },
      { field: 'number', label: 'Phone Number' },
      { field: 'district', label: 'District' },
      { field: 'upazilla', label: 'Thana / Upazila' },
      { field: 'union', label: 'Village / Ward Address' }
    ]

    const missingField = requiredFields.find(field => !formData[field.field as keyof OrderFormData])
    if (missingField) {
      toast.error(`Please fill in the ${missingField.label} field`)
      return
    }

    if (itemsWithQuantity.length === 0) {
      toast.error('No products in cart')
      return
    }

    const phoneRegex = /^01[3-9]\d{8}$/
    if (!phoneRegex.test(formData.number)) {
      toast.error('Please enter a valid Bangladeshi phone number (01XXXXXXXXX)')
      return
    }

    setLoading(true)

    try {
      const productsWithQuantity: string[] = []
      itemsWithQuantity.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          productsWithQuantity.push(item.id)
        }
      })

      // Clean address aggregation using only your updated variables
      const orderData = {
        name: formData.name,
        number: formData.number,
        address: `${formData.union}, ${formData.upazilla}, ${formData.district}`,
        products: productsWithQuantity,
        totalAmount: subtotal,
        deliveryCharge,
        discount,
        grandTotal,
        paymentMethod: formData.paymentMethod,
        note: formData.note
      }

      const response = await fetch('/api/v1/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("SERVER VALIDATION ERROR DETAILS:", errorData);
        throw new Error(errorData?.message || 'Failed to create order');
      }

      const result = await response.json()

      // 👇 GENERATE A UNIQUE DEDUPLICATION KEY
      const uniqueEventId = `pur_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // 1. Fire Browser Pixel with the eventID parameter.
      await trackPurchaseEvent(uniqueEventId)

      // 2. Fire Server-Side Conversions API (CAPI) right alongside it
      try {
        await fetch('/api/v1/meta-capi', { // We will create this API route in Step 2
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'Purchase',
            eventId: uniqueEventId,
            value: grandTotal,
            currency: 'BDT',
            products: itemsWithQuantity.map(item => ({ id: item.id, quantity: item.quantity })),
            // Optional but highly recommended: Send phone/name for better matching
            userData: {
              ph: formData.number,
              fn: formData.name
            }
          }),
        });
      } catch (capiError) {
        console.error("Server-side CAPI failed to fire:", capiError);
        // We catch it silently so it doesn't break the user's successful checkout experience
      }

      const orderedProductIds = itemsWithQuantity.map(item => item.id)
      removeProductsFromStorage(orderedProductIds)

      setOrderSuccess(true)
      setOrderId(result.orderId || `ORD-${Date.now()}`)
      toast.success('Order placed successfully!')

      handlePurchasedData([])
      setItemsWithQuantity([])
      setFormData({
        name: '',
        number: '',
        district: '',
        upazilla: '',
        union: '',
        note: '',
        paymentMethod: 'cash-on-delivery'
      })

    } catch (error) {
      console.error('Order submission error:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (orderSuccess) {
    return <OrderSuccessModal orderId={orderId} router={router} />
  }

  if (itemsWithQuantity.length === 0 && cleanPurchasesData.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OrderSummary
          itemsWithQuantity={itemsWithQuantity}
          subtotal={subtotal}
          deliveryCharge={deliveryCharge}
          discount={discount}
          grandTotal={grandTotal}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
        />

        <ShippingForm
          formData={formData}
          onInputChange={handleInputChange}
          deliveryCharge={deliveryCharge}
          grandTotal={grandTotal}
          loading={loading}
          onSubmitOrder={handleSubmitOrder}
          isFormValid={
            !!formData.name &&
            !!formData.number &&
            !!formData.union &&
            !!formData.district &&
            !!formData.upazilla
          }
        />
      </div>
    </div>
  )
}