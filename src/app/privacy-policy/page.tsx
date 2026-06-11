import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-3xl space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed mt-20">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">Privacy Policy</h1>
                <p className="text-gray-500">Effective Date: June 2026</p>
            </div>

            <Separator />

            <p>
                Your privacy matters heavily to us. This privacy charter breaks down what specific details we record when you interface with our checkout portal and how we safely manage that log.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6">1. Information Collection</h2>
            <p>
                When you submit an order, we store necessary execution data including your <strong>Full Name</strong>, <strong>Phone Number</strong>, and <strong>Address Coordinates (District, Thana, Village / Ward Address)</strong>. This guarantees your parcels land securely at the correct location.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6">2. Utilization of Data</h2>
            <p>
                We restrict user profile metrics exclusively to logistical loops:
            </p>
            <ul className="list-disc pl-5 space-y-1">
                <li>Processing orders and orchestrating courier dispatchments.</li>
                <li>Communicating verification check calls within 1 hour.</li>
                <li>Issuing transactional delivery notification alerts.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6">3. Third-Party Restrictions</h2>
            <p>
                We completely refuse data exploitation methods. Your individual address patterns and contact endpoints are shared **only** with our assigned delivery service agencies to fulfill your parcel dropped handoff, and nothing else.
            </p>
        </div>
    )
}