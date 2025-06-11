import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Terms: React.FC = () => {
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
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-gray-800">
            <p className="text-gray-500 mb-8">
              Last updated: March 20, 2024
            </p>

            <h2 className="text-gray-900">1. Introduction</h2>
            <p className="text-gray-700">
              These Terms of Service govern your participation in Vision Jeunesse Nouvelle (VJN) programs, use of our services, and interaction with our organization. By engaging with VJN, you agree to these terms.
            </p>

            <h2 className="text-gray-900">2. Our Programs and Services</h2>
            <p className="text-gray-700">
              VJN offers various programs and services including:
            </p>
            <ul className="text-gray-700">
              <li>Educational and vocational training programs</li>
              <li>Economic empowerment initiatives</li>
              <li>Health awareness and peer education</li>
              <li>Peace-building activities</li>
              <li>Sports, culture, and arts programs</li>
              <li>Savings and credit groups</li>
            </ul>

            <h2 className="text-gray-900">3. Participant Responsibilities</h2>
            <p className="text-gray-700">
              As a participant in VJN programs, you agree to:
            </p>
            <ul className="text-gray-700">
              <li>Provide accurate and complete information during registration</li>
              <li>Follow program guidelines and attendance requirements</li>
              <li>Respect other participants and staff members</li>
              <li>Maintain confidentiality of group discussions</li>
              <li>Use resources and facilities responsibly</li>
              <li>Participate actively in program activities</li>
              <li>Follow VJN's code of conduct</li>
            </ul>

            <h2 className="text-gray-900">4. Program-Specific Terms</h2>
            
            <h3 className="text-gray-800">4.1 Educational Programs</h3>
            <ul className="text-gray-700">
              <li>Regular attendance is required for vocational training</li>
              <li>Training materials provided remain VJN property</li>
              <li>Certification requirements must be met</li>
              <li>Special accommodations available for differently-abled participants</li>
            </ul>

            <h3 className="text-gray-800">4.2 Economic Empowerment</h3>
            <ul className="text-gray-700">
              <li>Savings group members must follow group constitution</li>
              <li>Regular contributions as agreed by the group</li>
              <li>Proper documentation of all transactions</li>
              <li>Compliance with financial regulations</li>
            </ul>

            <h3 className="text-gray-800">4.3 Health Programs</h3>
            <ul className="text-gray-700">
              <li>Confidentiality of health information</li>
              <li>Informed consent for health services</li>
              <li>Adherence to health and safety guidelines</li>
              <li>Proper use of medical resources</li>
            </ul>

            <h2 className="text-gray-900">5. Volunteer and Staff Conduct</h2>
            <p className="text-gray-700">
              Volunteers and staff must:
            </p>
            <ul className="text-gray-700">
              <li>Maintain professional conduct</li>
              <li>Protect beneficiary confidentiality</li>
              <li>Follow child protection policies</li>
              <li>Report any concerns or incidents</li>
              <li>Complete required training</li>
            </ul>

            <h2 className="text-gray-900">6. Donations and Financial Support</h2>
            <p className="text-gray-700">
              When making donations:
            </p>
            <ul className="text-gray-700">
              <li>All donations are voluntary and non-refundable</li>
              <li>Donors receive acknowledgment and updates</li>
              <li>Restricted donations used as specified</li>
              <li>Financial records maintained as per law</li>
            </ul>

            <h2 className="text-gray-900">7. Intellectual Property</h2>
            <p className="text-gray-700">
              VJN retains rights to:
            </p>
            <ul className="text-gray-700">
              <li>Training materials and curricula</li>
              <li>Program documentation and reports</li>
              <li>Photos and media from events (with consent)</li>
              <li>Website content and publications</li>
            </ul>

            <h2 className="text-gray-900">8. Limitation of Liability</h2>
            <p className="text-gray-700">
              VJN strives to provide quality services but:
            </p>
            <ul className="text-gray-700">
              <li>Cannot guarantee specific outcomes</li>
              <li>Is not liable for personal property loss</li>
              <li>Maintains appropriate insurance coverage</li>
              <li>Follows standard safety procedures</li>
            </ul>

            <h2 className="text-gray-900">9. Dispute Resolution</h2>
            <p className="text-gray-700">
              Any disputes will be resolved through:
            </p>
            <ul className="text-gray-700">
              <li>Direct dialogue with program coordinators</li>
              <li>Internal grievance procedures</li>
              <li>Mediation if necessary</li>
              <li>Rwandan law where applicable</li>
            </ul>

            <h2 className="text-gray-900">10. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these terms:
            </p>
            <p className="text-gray-700">
              Email: visionjeunesse2050@gmail.com<br />
              Phone: +250 785 403 435<br />
              Address: Rubavu District, Gisenyi Sector, Nengo Cell, Gikarani Village
            </p>

            <p className="text-gray-500 mt-8">
              These terms may be updated periodically. Continued participation in VJN programs constitutes acceptance of any changes.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Terms; 