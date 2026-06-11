import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, ShieldCheck, HelpCircle } from "lucide-react"

export default function DeliveryInformationPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl space-y-8 mt-20">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">Delivery Information</h1>
                <p className="text-gray-500 dark:text-gray-400">Everything you need to know about receiving your packages</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-md border-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/10 dark:to-indigo-950/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl text-blue-700 dark:text-blue-400">
                            <Truck className="h-6 w-6" /> Shipping Charges
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-gray-700 dark:text-gray-300">
                        <p className="font-medium">Standard delivery fees applied across Bangladesh:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Inside Dhaka:</strong> 70 BDT</li>
                            <li><strong>Outside Dhaka:</strong> 90 BDT</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30 dark:from-green-950/10 dark:to-emerald-950/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl text-green-700 dark:text-green-400">
                            <Clock className="h-6 w-6" /> Delivery Timeline
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-gray-700 dark:text-gray-300">
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Inside Dhaka:</strong> 1 - 3 business days</li>
                            <li><strong>Outside Dhaka:</strong> 3 - 5 business days</li>
                            <li><strong>Confirmation:</strong> Order confirmation call within 1 hour of placement.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-md border-0">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-purple-700 dark:text-purple-400">
                        <ShieldCheck className="h-6 w-6" /> Order Inspection
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300 space-y-4">
                    <p>
                        For Cash-on-Delivery, we highly recommend checking the physical condition of the package and items in front of the courier agent before finalizing the payment.
                    </p>
                    <p>
                        If you notice structural damage or find missing products, safely reject the parcel and contact our help desk immediately.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}