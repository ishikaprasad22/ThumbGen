'use client'
import SectionTitle from "../components/SectionTitle"
import { pricingData } from "../data/pricing";
import type { IPricing } from "../types";
import { CheckIcon } from "lucide-react";
import { motion } from "motion/react";

export default function PricingSection() {
    return (
        <div id="pricing" className="px-4 md:px-16 lg:px-24 xl:px-32">
            <SectionTitle text1="Pricing" text2="Simple Pricing" text3="Choose the plan that fits your creation schedule. Cancel anytime." />

            <div className="flex flex-wrap items-center justify-center gap-8 mt-20">
                {pricingData.map((plan: IPricing, index: number) => (
                    <motion.div key={index} className={`w-72 text-center border border-pink-950 p-6 pb-16 rounded-xl ${plan.mostPopular ? 'bg-pink-950 relative' : 'bg-pink-950/30'}`}
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        {plan.mostPopular && (
                            <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-pink-400 rounded-full">Most Popular</p>
                        )}
                        <p className="font-semibold">{plan.name}</p>
                        <h1 className="text-3xl font-semibold">${plan.price}<span className="text-gray-500 font-normal text-sm">/{plan.period}</span></h1>
                        <ul className="list-none text-slate-300 mt-6 space-y-2">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <CheckIcon className="size-4.5 text-pink-600" />
                                    <p>{feature}</p>
                                </li>
                            ))}
                        </ul>
                        <button type="button" className={`w-full py-2.5 rounded-md font-medium mt-7 transition-all ${plan.mostPopular ? 'bg-white text-pink-600 hover:bg-slate-200' : 'bg-pink-500 hover:bg-pink-600'}`}>
                            Get Started
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}