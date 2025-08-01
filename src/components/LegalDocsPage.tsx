import React, { useState, useEffect } from 'react';
import { useToyStore } from '../context/ToyStoreContext';
import { ShieldAlert, ChevronRight, FileText, ArrowLeft } from 'lucide-react';

const docTypes = [
  { file: 'terms_of_service.md', title: 'Terms of Service & Store Agreement' },
  { file: 'privacy_policy.md', title: 'Privacy & Data Protection Policy' },
  { file: 'shipping_policy.md', title: 'Shipping, Delivery & Customs Policy' },
  { file: 'return_refund_policy.md', title: 'Return, Replacement & Refund Policy' },
  { file: 'cookie_policy.md', title: 'Cookies & Tracking Technologies Policy' },
  { file: 'coppa_compliance.md', title: 'Children’s Online Privacy Protection Act (COPPA) Compliance' },
  { file: 'kid_safety_policy.md', title: 'Toy Quality & Child Safety Standards Policy' },
  { file: 'accessibility_statement.md', title: 'Digital Accessibility Statement & Policy' },
  { file: 'gdpr_privacy_notice.md', title: 'General Data Protection Regulation (GDPR) Privacy Notice' },
  { file: 'ccpa_privacy_notice.md', title: 'California Consumer Privacy Act (CCPA) Privacy Policy' },
  { file: 'payment_security_policy.md', title: 'Payment Security & PCI-DSS Compliance Policy' },
  { file: 'acceptable_use_policy.md', title: 'Acceptable Platform Use & Conduct Policy' },
  { file: 'intellectual_property_rights.md', title: 'Intellectual Property Rights & Trademark Protection Policy' },
  { file: 'general_disclaimer.md', title: 'General Store Disclaimers & Limitation of Liability' },
  { file: 'affiliate_disclosure.md', title: 'Affiliate Partnerships & Advertising Disclosure Policy' },
  { file: 'user_generated_content_policy.md', title: 'User Generated Content & Social Media Policy' },
  { file: 'customer_reviews_terms.md', title: 'Customer Reviews, Ratings & Feedback Policy' },
  { file: 'gift_card_terms_conditions.md', title: 'Gift Card & Voucher Terms of Use' },
  { file: 'loyalty_play_points_terms.md', title: 'Play Points Loyalty Reward Program Terms' },
  { file: 'support_service_level_agreement.md', title: 'Customer Support Service Level Agreement (SLA)' },
  { file: 'dmca_take_down_policy.md', title: 'Digital Millennium Copyright Act (DMCA) Takedown Policy' },
  { file: 'privacy_notice_for_kids.md', title: 'Kid-Friendly Privacy Notice & Safety Tips' },
  { file: 'parental_consent_policy.md', title: 'Parental Verification & Consent Policy' },
  { file: 'modern_slavery_act_statement.md', title: 'Modern Slavery Act & Human Rights Compliance Statement' },
  { file: 'supply_chain_transparency.md', title: 'Supply Chain Transparency & Ethical Sourcing Policy' },
  { file: 'environmental_sustainability_policy.md', title: 'Environmental Sustainability & Eco-Friendly Toy Policy' },
  { file: 'business_code_of_conduct.md', title: 'Corporate Social Responsibility & Code of Conduct' },
  { file: 'anti_bribery_corruption_policy.md', title: 'Anti-Bribery and Corruption Prevention Policy' },
  { file: 'whistleblower_policy.md', title: 'Internal Grievance & Whistleblower Protection Policy' },
  { file: 'product_warranty_terms.md', title: 'Manufacturer Defect & Toy Warranty Terms' }
];

export const LegalDocsPage: React.FC = () => {
  const { setActiveTab } = useToyStore();
  const [selectedDoc, setSelectedDoc] = useState(docTypes[0]);
  const [content, setContent] = useState<string>('Loading document content...');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setContent('Loading document...');
    setError('');
    fetch(`/legal/${selectedDoc.file}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load document (Status ${res.status})`);
        }
        return res.text();
      })
      .then(text => {
        setContent(text);
      })
      .catch(err => {
        console.error(err);
        setError('Error loading the document. Please verify it exists in the public directory.');
      });
  }, [selectedDoc]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
      {/* Back button */}
      <button
        onClick={() => setActiveTab('shop')}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 mb-6 focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Store
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Legal Compliance Center
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Read store guidelines, user policies, safety guarantees, and legal standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side: Document List */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm h-[calc(100vh-280px)] overflow-y-auto">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-2">
            Store Policies (30)
          </h2>
          <div className="space-y-1">
            {docTypes.map(doc => {
              const isSelected = selectedDoc.file === doc.file;
              return (
                <button
                  key={doc.file}
                  onClick={() => setSelectedDoc(doc)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate mr-2">{doc.title}</span>
                  <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Document Content Viewer */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm h-[calc(100vh-280px)] overflow-y-auto">
          {error ? (
            <div className="text-center py-12">
              <p className="text-sm font-bold text-rose-600 mb-2">{error}</p>
              <button
                onClick={() => setSelectedDoc({ ...selectedDoc })}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg"
              >
                Retry Load
              </button>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none text-xs leading-relaxed text-slate-700">
              {/* Parse and render markdown titles/headers in a very simple clean way */}
              {content.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) {
                  return (
                    <h1 key={idx} className="text-xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-100 mt-2">
                      {line.replace('# ', '')}
                    </h1>
                  );
                } else if (line.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-sm font-black text-slate-900 mt-6 mb-3">
                      {line.replace('## ', '')}
                    </h2>
                  );
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={idx} className="font-bold text-slate-800 my-2">
                      {line.replace(/\*\*/g, '')}
                    </p>
                  );
                } else if (line.trim() === '') {
                  return <div key={idx} className="h-2" />;
                } else {
                  return (
                    <p key={idx} className="mb-4">
                      {line}
                    </p>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
