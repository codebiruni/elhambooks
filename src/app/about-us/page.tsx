import { ShoppingBag, ShieldCheck, Users } from "lucide-react"

export default function AboutUsPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl space-y-12 mt-20">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">About Us</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    We are committed to bringing genuine, authentic quality products straight to consumers all across Bangladesh with zero logistical hassles.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-950/40 text-blue-600 rounded-xl">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">Handpicked Quality</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Every product cataloged on our site undergoes strict quality verification prior to packaging.
                    </p>
                </div>

                <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-950/40 text-green-600 rounded-xl">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">Trusted Deliveries</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Featuring 1-hour fast tracking phone alignment and transparent Cash On Delivery choices.
                    </p>
                </div>

                <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-950/40 text-purple-600 rounded-xl">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">Customer Centric</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our specialized helpline stands active to iron out any procedural issues instantly.
                    </p>
                </div>
            </div>
        </div>
    )
}