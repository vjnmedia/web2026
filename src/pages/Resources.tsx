import React from 'react';
import { ExternalLink, FileText, Cloud, Link2, FolderOpen } from 'lucide-react';

const onedriveLinks = [
  {
    name: 'VJN General Resources Folder',
    url: 'https://onedrive.live.com/?cid=YOUR_ONEDRIVE_FOLDER_ID',
    description: 'Access all shared documents, reports, and templates.'
  },
  {
    name: 'Annual Report 2023',
    url: 'https://onedrive.live.com/view.aspx?resid=YOUR_ONEDRIVE_FILE_ID',
    description: 'Download the latest annual report.'
  }
];

const vjnSystems = [
  {
    name: 'VJN Staff Portal',
    url: 'https://staff.visionjeunessenouvelle.org.rw',
    description: 'Internal portal for VJN staff and management.'
  },
  {
    name: 'VJN Youth Registration',
    url: 'https://youth.visionjeunessenouvelle.org.rw',
    description: 'Platform for youth to register and join VJN programs.'
  },
  {
    name: 'VJN Blog',
    url: 'https://blog.visionjeunessenouvelle.org.rw',
    description: 'Read news, stories, and updates from VJN.'
  },
  {
    name: 'VJN Community',
    url: 'https://community.visionjeunessenouvelle.org.rw',
    description: 'Join the VJN community and connect with other members.'
  },
  {
    name: 'Chat System',
    url: 'https://chat.visionjeunessenouvelle.org.rw',
    description: 'Real-time chat system for VJN members.'
  },
  {
    name: 'PFR Project',
    url: 'https://pfr.visionjeunessenouvelle.org.rw',
    description: 'Information and updates on the PFR project.'
  },
  {
    name: 'Youth Projects Tracker',
    url: 'https://projects.visionjeunessenouvelle.org.rw',
    description: 'Track and monitor youth projects and initiatives.'
  },
  {
    name: 'Talents Tracker',
    url: 'https://talents.visionjeunessenouvelle.org.rw',
    description: 'Discover and track youth talents and achievements.'
  },
  {
    name: 'Voting System',
    url: 'https://vote.visionjeunessenouvelle.org.rw',
    description: 'Participate in VJN voting and decision-making processes.'
  },
  {
    name: 'VJN FC',
    url: 'https://fc.visionjeunessenouvelle.org.rw',
    description: 'Information about VJN Football Club.'
  },
  {
    name: 'VJN Record',
    url: 'https://record.visionjeunessenouvelle.org.rw',
    description: 'Access VJN records and archives.'
  },
  {
    name: 'Lamennais Ltd',
    url: 'https://lamennais.visionjeunessenouvelle.org.rw',
    description: 'Information about Lamennais Ltd and its projects.'
  }
];

const Resources: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vjn-light-blue to-white py-12 px-4 md:px-0">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-vjn-blue mb-4">Resources & Links</h1>
          <p className="text-lg text-gray-600">Find important documents, shared resources, and access other VJN systems.</p>
        </header>

        {/* Documents & Resources Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Cloud className="w-7 h-7 text-vjn-blue" /> Documents & Resources
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {onedriveLinks.map((doc, idx) => (
              <a
                key={idx}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 border border-gray-100 hover:border-vjn-blue"
              >
                <div className="flex items-center gap-4 mb-3">
                  <FolderOpen className="w-8 h-8 text-vjn-blue group-hover:text-vjn-dark-blue transition" />
                  <span className="text-lg font-semibold text-vjn-dark-blue group-hover:underline">
                    {doc.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
                <p className="text-gray-500 text-sm">{doc.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Other VJN Systems Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Link2 className="w-7 h-7 text-vjn-blue" /> Other VJN Systems
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {vjnSystems.map((sys, idx) => (
              <a
                key={idx}
                href={sys.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 border border-gray-100 hover:border-vjn-blue"
              >
                <div className="flex items-center gap-4 mb-3">
                  <FileText className="w-8 h-8 text-vjn-blue group-hover:text-vjn-dark-blue transition" />
                  <span className="text-lg font-semibold text-vjn-dark-blue group-hover:underline">
                    {sys.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </div>
                <p className="text-gray-500 text-sm">{sys.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources; 