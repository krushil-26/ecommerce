"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is your return policy?",
    answer: "You can return any item within 30 days of purchase for a full refund, provided it is in its original condition.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive a tracking number via email to monitor its delivery status.",
  },
  {
    question: "Can I cancel my order after placing it?",
    answer: "Orders can be canceled within 24 hours of placement. After that, they will be processed for shipping.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, PayPal, and other secure payment gateways.",
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer border border-gray-200 transition-all duration-300 ease-in-out"
          >
            <div
              className="flex justify-between items-center text-gray-800 text-lg font-medium"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600 border-t pt-2 overflow-hidden transition-all duration-300 ease-in-out">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
