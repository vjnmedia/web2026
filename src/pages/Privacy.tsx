import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Privacy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-800">
            <p className="text-gray-500 mb-8">
              Last updated: March 20, 2024
            </p>

            <h2 className="text-gray-900">1. Introduction</h2>
            <p className="text-gray-700">
              Vision Jeunesse Nouvelle (VJN) is committed to protecting the privacy of our beneficiaries, volunteers, donors, and website visitors. This privacy policy explains how we collect, use, and safeguard your personal information across our programs and services.
            </p>

            <h2 className="text-gray-900">2. Information We Collect</h2>
            <p className="text-gray-700">
              We collect information necessary to provide our youth development and community services:
            </p>
            <ul className="text-gray-700">
              <li>Program participant information (name, age, contact details, education history)</li>
              <li>Volunteer and staff applications</li>
              <li>Donation and transaction records</li>
              <li>Health information for relevant programs (with consent)</li>
              <li>Photos and media from our events (with consent)</li>
              <li>Information for our savings and credit groups</li>
            </ul>

            <h2 className="text-gray-900">3. How We Use Your Information</h2>
            <p className="text-gray-700">
              We use collected information to:
            </p>
            <ul className="text-gray-700">
              <li>Deliver our educational and vocational training programs</li>
              <li>Manage economic empowerment initiatives and savings groups</li>
              <li>Coordinate health awareness and peer education programs</li>
              <li>Organize peace-building and cultural activities</li>
              <li>Process donations and maintain financial records</li>
              <li>Communicate about our programs and impact</li>
              <li>Improve our services and report to stakeholders</li>
            </ul>

            <h2 className="text-gray-900">4. Information Sharing</h2>
            <p className="text-gray-700">
              We may share information with:
            </p>
            <ul className="text-gray-700">
              <li>Partner organizations (USAID, FHI 360, MISEREOR, IMBUTO FOUNDATION) for program implementation</li>
              <li>Government agencies as required by Rwandan law</li>
              <li>Financial institutions for processing donations</li>
              <li>Service providers who help operate our programs</li>
            </ul>

            <h2 className="text-gray-900">5. Data Protection</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your information:
            </p>
            <ul className="text-gray-700">
              <li>Secure storage of physical documents</li>
              <li>Encrypted digital storage systems</li>
              <li>Limited access to sensitive information</li>
              <li>Regular staff training on data protection</li>
              <li>Compliance with Rwandan data protection laws</li>
            </ul>

            <h2 className="text-gray-900">6. Your Rights</h2>
            <p className="text-gray-700">
              You have the right to:
            </p>
            <ul className="text-gray-700">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Withdraw consent for optional data collection</li>
              <li>Request deletion of your information (where legally possible)</li>
              <li>Opt-out of communications</li>
            </ul>

            <h2 className="text-gray-900">7. Children's Privacy</h2>
            <p className="text-gray-700">
              Many of our programs serve youth under 18. We take special precautions:
            </p>
            <ul className="text-gray-700">
              <li>Require parental/guardian consent for data collection</li>
              <li>Limit information collected from minors</li>
              <li>Protect sensitive information about vulnerable youth</li>
              <li>Follow child protection policies in all programs</li>
            </ul>

            <h2 className="text-gray-900">8. Contact Us</h2>
            <p className="text-gray-700">
              For questions about our privacy practices or to exercise your rights:
            </p>
            <p className="text-gray-700">
              Email: visionjeunesse2050@gmail.com<br />
              Phone: +250 785 403 435<br />
              Address: Rubavu District, Gisenyi Sector, Nengo Cell, Gikarani Village
            </p>

            <p className="text-gray-500 mt-8">
              This privacy policy may be updated periodically to reflect changes in our practices or legal requirements.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy; 