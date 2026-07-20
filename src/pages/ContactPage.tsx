import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center py-20 px-6">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16">

        {/* LEFT SIDE - INFO */}
        <div className="lg:w-1/3 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact ARTecX
            </h1>
            <p className="text-gray-600 leading-relaxed">
              We design and build powerful digital products. Let's talk about
              your next big idea and how we can bring it to life.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-0.5">Email</h3>
                <p className="text-gray-500">info@artecx-solutions.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-0.5">Phone</h3>
                <p className="text-gray-500">+44 735 6200 686</p>
                <p className="text-gray-500">+94 719 620 413</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-0.5">Location</h3>
                <p className="text-gray-500">Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - MODERN CTA CARD */}
        <div className="lg:w-2/3 flex items-center justify-center">
          <div className="w-full bg-[#1e3a5f] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">

            {/* Glow background effects */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Let's build something amazing together
              </h2>

              <p className="text-white/70 mb-10 max-w-xl leading-relaxed">
                Whether you're launching a startup or scaling an enterprise
                product, our team is ready to create meaningful digital
                experiences tailored to your goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:info@artecx-solutions.com"
                  className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition duration-300 text-center"
                >
                  Send Email
                </a>
                <a
                  href="tel:+447356200686"
                  className="border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition duration-300 text-center"
                >
                  Call Us
                </a>
              </div>

              <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50 space-y-2">
                <p>✔ Free consultation</p>
                <p>✔ 24-hour response time</p>
                <p>✔ Transparent pricing</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;