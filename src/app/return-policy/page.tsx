import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, RefreshCw, XCircle, CheckCircle2 } from "lucide-react"

export default function ReturnPolicyPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl space-y-8 mt-20">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">Return & Refund Policy</h1>
                <p className="text-gray-500 dark:text-gray-400">Simple and straightforward protection for your orders</p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl dark:bg-amber-950/20 dark:border-amber-700">
                <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                        <strong>Notice:</strong> All return claims must be initialized within 7 days from the receipt date. Items must be completely unused with tags still attached.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2"><RefreshCw className="h-5 w-5 text-blue-500" /> Accepted Scenarios</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 border-l-4 border-l-green-500 shadow-sm">
                        <CardContent className="p-0 flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100">Defective / Damaged Products</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Product arrived broken, leaked, or structurally non-functional.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="p-4 border-l-4 border-l-green-500 shadow-sm">
                        <CardContent className="p-0 flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100">Incorrect Item Sent</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Received a different color, size, variation, or entirely wrong product.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200"><XCircle className="h-5 w-5 text-red-500" /> Non-Returnable Scenarios</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Change of mind after accepting and unpacking a pristine product.</li>
                    <li>Products showing visible damage from personal misuse or poor handling.</li>
                    <li>Clearance sale items or items explicitly marked &quot;Non-Returnable&quot;.</li>
                </ul>
            </div>
        </div>
    )
}