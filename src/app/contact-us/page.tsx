import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"

export default function ContactUsPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl space-y-8 mt-20">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">Contact Us</h1>
                <p className="text-gray-500 dark:text-gray-400">Have questions about your order? We are here to help.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center p-4 border-0 shadow-md">
                    <CardHeader className="flex items-center justify-center">
                        <div className="p-3 bg-green-100 dark:bg-green-950/40 rounded-full">
                            <Phone className="h-6 w-6 text-green-600" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <h3 className="font-bold text-lg">Call Support</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">+880 1XXXXXXXXX</p>
                        <p className="text-xs text-gray-400">Sat-Thu, 9 AM - 8 PM</p>
                    </CardContent>
                </Card>

                <Card className="text-center p-4 border-0 shadow-md">
                    <CardHeader className="flex items-center justify-center">
                        <div className="p-3 bg-blue-100 dark:bg-blue-950/40 rounded-full">
                            <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <h3 className="font-bold text-lg">Email Desk</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">support@yourdomain.com</p>
                        <p className="text-xs text-gray-400">Replies within 24 hours</p>
                    </CardContent>
                </Card>

                <Card className="text-center p-4 border-0 shadow-md">
                    <CardHeader className="flex items-center justify-center">
                        <div className="p-3 bg-purple-100 dark:bg-purple-950/40 rounded-full">
                            <MapPin className="h-6 w-6 text-purple-600" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <h3 className="font-bold text-lg">Corporate Office</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Mirpur, Dhaka</p>
                        <p className="text-xs text-gray-400">Bangladesh</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner">
                <div className="flex items-center gap-4">
                    <MessageSquare className="h-10 w-10 text-blue-600 shrink-0" />
                    <div>
                        <h3 className="font-bold text-xl">Need Immediate Assistance?</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">For ongoing updates regarding orders, directly call our desk using your registered phone number.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}