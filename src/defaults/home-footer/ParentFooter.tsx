import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";

export default function ParentFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Shop Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Our Store
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Providing high quality products with fast delivery and excellent
              customer service.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <a href="https://www.facebook.com/profile.php?id=61589566599337" target="_blank">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/return-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  Bangladesh,Dhaka , Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  +8801639-802756
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-300 dark:bg-gray-700" />

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <Truck className="w-6 h-6 text-purple-600" />
            <div>
              <h4 className="font-medium">Free Shipping</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                On offers products
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <CreditCard className="w-6 h-6 text-purple-600" />
            <div>
              <h4 className="font-medium">Secure Payment</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                100% secure payment
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-purple-600" />
            <div>
              <h4 className="font-medium">Quality Products</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Guaranteed quality
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <Phone className="w-6 h-6 text-purple-600" />
            <div>
              <h4 className="font-medium">24/7 Support</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dedicated support
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-4 bg-gray-300 dark:bg-gray-700" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Elhambooks. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Cookies Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
