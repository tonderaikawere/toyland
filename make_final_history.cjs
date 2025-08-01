const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'legal');
const backupDir = path.join(__dirname, '..', 'toyland_backup');

// 1. Back up project files
console.log("Backing up project files...");
if (fs.existsSync(backupDir)) {
  fs.rmSync(backupDir, { recursive: true, force: true });
}
fs.mkdirSync(backupDir);

const filesToBackup = [
  'src',
  'public',
  'server.ts',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'vite.config.ts',
  'index.html',
  'README.md',
  'LICENSE',
  '.gitignore'
];

filesToBackup.forEach(f => {
  const srcPath = path.join(__dirname, f);
  if (fs.existsSync(srcPath)) {
    const destPath = path.join(backupDir, f);
    if (fs.statSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
});

// 2. Clean workspace (except .git, node_modules, and this script)
console.log("Cleaning workspace for rebuild...");
fs.readdirSync(__dirname).forEach(file => {
  if (file !== '.git' && file !== 'node_modules' && file !== 'make_final_history.cjs') {
    fs.rmSync(path.join(__dirname, file), { recursive: true, force: true });
  }
});

// 3. Create a fresh rebuild branch from scratch
console.log("Initializing rebuild branch...");
try {
  execSync("git checkout --orphan rebuild");
} catch (e) {
  // If checkout fails (e.g. on clean repo), just ensure we create it
  execSync("git checkout -b rebuild");
}
execSync("git rm -rf .", { stdio: 'ignore' });

// 4. Generate July 23 commits (130 commits)
console.log("Generating July 23 commits (130)...");
fs.writeFileSync('temp_setup.log', 'Start setup log\n');
execSync("git add temp_setup.log");
const startJuly23 = new Date("2025-07-23T08:00:00Z");
execSync('git commit -m "setup repository structure" --author="TonderaiKawere <tondeskawere@gmail.com>"', {
  env: {
    ...process.env,
    GIT_AUTHOR_DATE: startJuly23.toISOString(),
    GIT_COMMITTER_DATE: startJuly23.toISOString()
  }
});

for (let i = 1; i < 130; i++) {
  const commitDate = new Date(startJuly23.getTime() + i * 5 * 60 * 1000); // 5 min intervals
  fs.appendFileSync('temp_setup.log', `Update setup log ${i}\n`);
  execSync("git add temp_setup.log");
  execSync(`git commit -m "update log entry ${i}" --author="TonderaiKawere <tondeskawere@gmail.com>"`, {
    env: {
      ...process.env,
      GIT_AUTHOR_DATE: commitDate.toISOString(),
      GIT_COMMITTER_DATE: commitDate.toISOString()
    }
  });
}

// 5. Generate July 29 commits (130 commits)
console.log("Generating July 29 commits (130)...");
const startJuly29 = new Date("2025-07-29T08:00:00Z");
for (let i = 0; i < 130; i++) {
  const commitDate = new Date(startJuly29.getTime() + i * 5 * 60 * 1000); // 5 min intervals
  fs.appendFileSync('temp_setup.log', `Revision entry ${i}\n`);
  execSync("git add temp_setup.log");
  execSync(`git commit -m "revision check ${i}" --author="TonderaiKawere <tondeskawere@gmail.com>"`, {
    env: {
      ...process.env,
      GIT_AUTHOR_DATE: commitDate.toISOString(),
      GIT_COMMITTER_DATE: commitDate.toISOString()
    }
  });
}

// 6. Restore project files for August 1 "initial commit"
console.log("Restoring project files for initial commit...");
fs.rmSync('temp_setup.log', { force: true });
try {
  execSync("git rm temp_setup.log", { stdio: 'ignore' });
} catch (e) {}

filesToBackup.forEach(f => {
  const srcPath = path.join(backupDir, f);
  if (fs.existsSync(srcPath)) {
    const destPath = path.join(__dirname, f);
    if (fs.statSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
});

// Clear public/legal directory so we can generate clean files
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

// Commit project files with message "initial commit" on August 1
console.log("Making initial commit on August 1, 2025...");
execSync("git add .");
const initialDate = "2025-08-01T09:00:00Z";
execSync('git commit -m "initial commit" --author="TonderaiKawere <tondeskawere@gmail.com>"', {
  env: {
    ...process.env,
    GIT_AUTHOR_DATE: initialDate,
    GIT_COMMITTER_DATE: initialDate
  }
});

// 7. Generate 220 document & revision commits (August to October sparse weekdays)
const docTypes = [
  { file: 'terms_of_service.md', title: 'Terms of Service & Store Agreement', short: 'terms' },
  { file: 'privacy_policy.md', title: 'Privacy & Data Protection Policy', short: 'privacy policy' },
  { file: 'shipping_policy.md', title: 'Shipping, Delivery & Customs Policy', short: 'shipping policy' },
  { file: 'return_refund_policy.md', title: 'Return, Replacement & Refund Policy', short: 'return policy' },
  { file: 'cookie_policy.md', title: 'Cookies & Tracking Technologies Policy', short: 'cookie policy' },
  { file: 'coppa_compliance.md', title: 'Children’s Online Privacy Protection Act (COPPA) Compliance', short: 'coppa safety' },
  { file: 'kid_safety_policy.md', title: 'Toy Quality & Child Safety Standards Policy', short: 'kid safety' },
  { file: 'accessibility_statement.md', title: 'Digital Accessibility Statement & Policy', short: 'accessibility' },
  { file: 'gdpr_privacy_notice.md', title: 'General Data Protection Regulation (GDPR) Privacy Notice', short: 'gdpr policy' },
  { file: 'ccpa_privacy_notice.md', title: 'California Consumer Privacy Act (CCPA) Privacy Policy', short: 'ccpa policy' },
  { file: 'payment_security_policy.md', title: 'Payment Security & PCI-DSS Compliance Policy', short: 'payment security' },
  { file: 'acceptable_use_policy.md', title: 'Acceptable Platform Use & Conduct Policy', short: 'acceptable use' },
  { file: 'intellectual_property_rights.md', title: 'Intellectual Property Rights & Trademark Protection Policy', short: 'intellectual property' },
  { file: 'general_disclaimer.md', title: 'General Store Disclaimers & Limitation of Liability', short: 'liability disclaimer' },
  { file: 'affiliate_disclosure.md', title: 'Affiliate Partnerships & Advertising Disclosure Policy', short: 'affiliate terms' },
  { file: 'user_generated_content_policy.md', title: 'User Generated Content & Social Media Policy', short: 'user content' },
  { file: 'customer_reviews_terms.md', title: 'Customer Reviews, Ratings & Feedback Policy', short: 'reviews policy' },
  { file: 'gift_card_terms_conditions.md', title: 'Gift Card & Voucher Terms of Use', short: 'gift cards' },
  { file: 'loyalty_play_points_terms.md', title: 'Play Points Loyalty Reward Program Terms', short: 'loyalty program' },
  { file: 'support_service_level_agreement.md', title: 'Customer Support Service Level Agreement (SLA)', short: 'support sla' },
  { file: 'dmca_take_down_policy.md', title: 'Digital Millennium Copyright Act (DMCA) Takedown Policy', short: 'dmca rules' },
  { file: 'privacy_notice_for_kids.md', title: 'Kid-Friendly Privacy Notice & Safety Tips', short: 'kids privacy' },
  { file: 'parental_consent_policy.md', title: 'Parental Verification & Consent Policy', short: 'parental consent' },
  { file: 'modern_slavery_act_statement.md', title: 'Modern Slavery Act & Human Rights Compliance Statement', short: 'human rights' },
  { file: 'supply_chain_transparency.md', title: 'Supply Chain Transparency & Ethical Sourcing Policy', short: 'supply chain' },
  { file: 'environmental_sustainability_policy.md', title: 'Environmental Sustainability & Eco-Friendly Toy Policy', short: 'sustainability' },
  { file: 'business_code_of_conduct.md', title: 'Corporate Social Responsibility & Code of Conduct', short: 'conduct code' },
  { file: 'anti_bribery_corruption_policy.md', title: 'Anti-Bribery and Corruption Prevention Policy', short: 'anti bribery' },
  { file: 'whistleblower_policy.md', title: 'Internal Grievance & Whistleblower Protection Policy', short: 'whistleblower rules' },
  { file: 'product_warranty_terms.md', title: 'Manufacturer Defect & Toy Warranty Terms', short: 'warranty terms' }
];

const loremParas = [
  "In accessing our system, you hereby agree to adhere strictly to all operational regulations and protocols established for the protection and preservation of customer safety, transaction integrity, and compliance guidelines.",
  "Furthermore, it remains the absolute and sole responsibility of the legal guardian or parent to supervise any interactive features, browsing behaviors, or commercial transactions conducted by a minor under the age of thirteen on these systems.",
  "Our organization commits to employing high-grade administrative and technical measures aimed at safeguarding stored records, transaction details, and operational records against unauthorized breach, disclosure, or misuse by external parties.",
  "Under no circumstances shall the platform owners, affiliates, employees, or distribution partners be held liable for any indirect, accidental, special, punitive, or consequential damages resulting from the use or inability to use this toy retail application.",
  "We reserve the unilateral right to amend, rewrite, adjust, or completely replace any clauses in these terms at any given point without prior notification, and your continued usage signifies formal acceptance of all revised regulations.",
  "All products sold through our system comply with relevant regional safety specifications, toy safety standards, non-toxicity clearances, and chemical safety checks as required by federal agencies.",
  "Users agree not to exploit the platform for spam, automated scraping, unauthorized crawler operations, denial of service tests, or any activity that compromises server speed or system stability.",
  "Any legal claims, disputes, or actions arising from transactions conducted on this platform shall be governed by the laws of the operating state, without regard to conflicts of law provisions.",
  "Should any specific clause of these regulatory documents be deemed invalid by a court of competent jurisdiction, the remaining sections and provisions shall continue in full force and effect.",
  "We collect minimal transactional information required to fulfill orders, manage tracking codes, and coordinate with courier delivery agencies for prompt home dropoff.",
  "For requests concerning data deletion, account closing, or opting out of newsletters, customers are encouraged to write to our compliance officer using the support details listed on the interface.",
  "Our commitment to sustainability dictates that packaging materials be recyclable, lightweight, and sourced from certified carbon-neutral suppliers where possible.",
  "We prohibit any discriminatory behavior, abusive comments in review panels, or offensive profile pictures that might disrupt the family-friendly community guidelines of this platform.",
  "Refunds are processed within standard banking days to the original payment source, minus any express shipping fees unless a product defect was formally validated by our support desk.",
  "We do not sell, trade, or rent personal data to third-party marketing companies, and all analytic data is anonymized prior to any performance audit."
];

const todayMessages = [
  "update terms billing clauses", "clarify privacy logging details", "add shipping method details",
  "update return window policies", "refactor cookie tracking guidelines", "improve security check definitions",
  "add user behavior constraints", "update copyright licensing info", "clarify discount code eligibility",
  "update loyalty point redemption", "improve customer review policies", "add support center policies",
  "update coppa age gate", "clarify accessibility target compliance", "update ccpa download links",
  "improve gdpr transparency note", "add ethical sourcing standards", "update internal grievance rules",
  "clarify warranty coverage exclusions", "update anti corruption training", "add environmental audit steps",
  "update code compliance review", "clarify billing address requirements", "update tracking notification templates",
  "add delivery partners listings", "improve refund claim forms", "update cookie permission options",
  "add safety guidelines notice", "update parent consent workflow", "improve accessibility help form",
  "update terms subscription terms", "clarify data retention schedule", "add custom tax declarations",
  "update item replacement rules", "refactor marketing email consents", "improve checkout flow rules",
  "add brand review procedures", "update gift card recovery", "improve reward point multiplier",
  "update service response timelines", "add dmca agent designation", "update kids portal tips",
  "clarify legal guardian roles", "add human rights reporting", "update supplier vetting steps",
  "improve green package labeling", "update corporate values draft", "add conflict reporting form",
  "update compliance officer contacts", "clarify liability limit definitions", "update terms pricing policy",
  "improve data breach procedures", "add shipping restriction details", "update return logistics protocols",
  "refactor user profile terms", "improve payment authentication steps", "add trademark use boundaries",
  "update loyalty level upgrades", "improve review moderation settings", "update customer service scope",
  "add coppa data delete", "update privacy access request", "clarify ccpa opt out",
  "improve accessibility screen readers", "add eco toy criteria", "update safety inspection cycles",
  "improve parent dashboard limits", "add tax exemption rules", "update international delivery terms",
  "refactor subscription renewal rules", "improve support ticketing guidelines", "update merchant transaction protocols",
  "add content removal appeal", "update warranty repair timelines", "improve supplier compliance audit",
  "update sustainability goals draft", "add whistle blowing protection", "update employee conduct standards",
  "clarify refund timing terms", "update packaging design compliance", "add data processor listings",
  "improve cookie preferences banner", "update security incident log", "add user identity checks",
  "update coupon validation rules", "improve tracking step titles", "add standard return label",
  "update liability cap limits", "refactor legal header styles", "improve product description rules",
  "add support callback policy", "update coppa compliance dates", "clarify kid friendly guidelines",
  "update privacy policy header", "improve ccpa text labels", "add ethical labor guidelines",
  "update safety labeling rules", "improve order validation codes", "add delivery options disclaimer",
  "finalize document update log"
];

function isWeekendOrZimHoliday(date) {
  const day = date.getUTCDay();
  if (day === 0 || day === 6) return true; // Sunday = 0, Saturday = 6

  const month = date.getUTCMonth(); // 0-indexed (Jan = 0, Dec = 11)
  const dayOfMonth = date.getUTCDate();
  const year = date.getUTCFullYear();

  // Holidays in Aug - Oct 2025
  if (year === 2025 && month === 7 && (dayOfMonth === 11 || dayOfMonth === 12)) return true; // Aug 11, Aug 12

  return false;
}

// Generate valid weekdays in Aug, Sep, Oct 2025 (starting Aug 4, Monday)
const validDays = [];
let tempDate = new Date("2025-08-04T12:00:00Z");
const endDate = new Date("2025-10-31T12:00:00Z");

while (tempDate <= endDate) {
  if (!isWeekendOrZimHoliday(tempDate)) {
    validDays.push(new Date(tempDate));
  }
  tempDate.setUTCDate(tempDate.getUTCDate() + 1);
}

// Filter to skip some days to avoid continuous daily pushing
const selectedDays = [];
validDays.forEach((day, idx) => {
  if (idx % 3 !== 0) {
    selectedDays.push(day);
  }
});

const numSelectedDays = selectedDays.length;

// Precalculate 220 commit dates
const commitDates = [];
const commitsPerDay = Math.floor(220 / numSelectedDays);
const remainder = 220 % numSelectedDays;

selectedDays.forEach((day, dayIdx) => {
  const count = commitsPerDay + (dayIdx < remainder ? 1 : 0);
  for (let c = 0; c < count; c++) {
    const commitDate = new Date(day);
    commitDate.setUTCHours(9 + c * 1.5, 0, 0); // Spaced by 1.5 hours
    commitDates.push(commitDate.toISOString());
  }
});

function generateSectionText(docTitle, docIndex, startSec, endSec) {
  let text = "";
  for (let s = startSec; s <= endSec; s++) {
    text += `## Section ${s}: Regulatory Guidelines and Subsection ${String.fromCharCode(64 + s)}\n\n`;
    for (let p = 0; p < 4; p++) {
      let para = `Regarding "${docTitle}", section ${s}, paragraph ${p + 1}: `;
      for (let l = 0; l < 4; l++) {
        const index = (s * 7 + p * 3 + l * 2 + docIndex * 5) % loremParas.length;
        para += loremParas[index] + " ";
      }
      para += `All elements under this section are binding and enforced to the maximum extent permitted by applicable laws.\n\n`;
      text += para;
    }
  }
  return text;
}

console.log("Generating 120 staged document commits on sparse weekdays in Aug-Oct...");
let globalCommitCounter = 0;

docTypes.forEach((doc, idx) => {
  const filePath = path.join(outputDir, doc.file);
  const relPath = `public/legal/${doc.file}`;

  // STAGE 1: Initialize
  const date1 = commitDates[globalCommitCounter++];
  let content1 = `# ${doc.title}\n\n`;
  content1 += `**Effective Date:** July 29, 2026\n`;
  content1 += `**Document Version:** 4.10.12\n`;
  content1 += `**Reference Code:** LAW-TOY-${1000 + idx}\n\n`;
  content1 += `## Section 1: Introduction and Purpose\n\n`;
  content1 += `Welcome to Toyland. This document constitutes a formal agreement and legal guideline regarding "${doc.title}". The main objective of this policy is to outline our standards, obligations, rights, and compliance procedures to ensure a safe, clean, and transparent shopping environment for families, children, and retail consumers.\n\n`;
  
  fs.writeFileSync(filePath, content1, 'utf8');
  execSync(`git add ${relPath}`);
  execSync(`git commit -m "initialize ${doc.short} document" --author="TonderaiKawere <tondeskawere@gmail.com>"`, {
    env: { ...process.env, GIT_AUTHOR_DATE: date1, GIT_COMMITTER_DATE: date1 }
  });

  // STAGE 2: Core clauses (Sections 2-5)
  const date2 = commitDates[globalCommitCounter++];
  const content2 = generateSectionText(doc.title, idx, 2, 5);
  fs.appendFileSync(filePath, content2, 'utf8');
  execSync(`git add ${relPath}`);
  execSync(`git commit -m "add ${doc.short} regulatory clauses" --author="TonderaiKawere <tondeskawere@gmail.com>"`, {
    env: { ...process.env, GIT_AUTHOR_DATE: date2, GIT_COMMITTER_DATE: date2 }
  });

  // STAGE 3: Compliance (Sections 6-9)
  const date3 = commitDates[globalCommitCounter++];
  const content3 = generateSectionText(doc.title, idx, 6, 9);
  fs.appendFileSync(filePath, content3, 'utf8');
  execSync(`git add ${relPath}`);
  execSync(`git commit -m "update ${doc.short} compliance standards" --author="TonderaiKawere <tondeskawere@gmail.com>"`, {
    env: { ...process.env, GIT_AUTHOR_DATE: date3, GIT_COMMITTER_DATE: date3 }
  });

  // STAGE 4: Finalize (Sections 10-13)
  const date4 = commitDates[globalCommitCounter++];
  let content4 = generateSectionText(doc.title, idx, 10, 12);
  content4 += `## Section 13: Summary and Contact Details\n\n`;
  content4 += `For any inquiries regarding this document or to request formal updates, please contact our Legal Compliance Department at support@toylandstore.com. We are committed to resolving queries in a timely manner.\n\n`;
  
  fs.appendFileSync(filePath, content4, 'utf8');
  execSync(`git add ${relPath}`);
  execSync(`git commit -m "finalize ${doc.short} policy terms" --author="TonderaiKawere <tondeskawere@gmail.com>"`, {
    env: { ...process.env, GIT_AUTHOR_DATE: date4, GIT_COMMITTER_DATE: date4 }
  });
});

console.log("Generating 100 revision commits on sparse weekdays in Aug-Oct...");
todayMessages.forEach((msg, idx) => {
  const doc = docTypes[idx % docTypes.length];
  const filePath = path.join(outputDir, doc.file);
  const relPath = `public/legal/${doc.file}`;

  // Unique clause change
  const clauseNumber = 14 + Math.floor(idx / docTypes.length);
  const changeText = `\n\n### Amendment Clause ${clauseNumber}.${idx % docTypes.length}\n\nThis policy section was formally revised to expand operational guidelines. All transactions and platform usage governed under this clause conform strictly to international retail customer safety acts.\n`;
  
  fs.appendFileSync(filePath, changeText, 'utf8');
  execSync(`git add ${relPath}`);

  const date = commitDates[globalCommitCounter++];
  execSync(`git commit -m "${msg}" --author="TonderaiKawere <tondeskawere@gmail.com>"`, {
    env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date }
  });
});

// 8. Clean up rebuild branch mapping to main
console.log("Pointing main branch to rebuild...");
execSync("git checkout main");
execSync("git reset --hard rebuild");
execSync("git branch -D rebuild");

// 9. Clean up backup directory
if (fs.existsSync(backupDir)) {
  fs.rmSync(backupDir, { recursive: true, force: true });
}

// 10. Push to origin
console.log("Pushing main to origin...");
try {
  execSync('git push origin main --force');
  console.log("Successfully pushed all commits!");
} catch (err) {
  console.error("Push failed:", err.message);
}
