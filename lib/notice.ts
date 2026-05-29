// lib/notice.ts
// Configuration for the notice banner
// Set enabled to true to show the banner, false to hide it

export interface Notice {
  enabled: boolean;
  type: 'info' | 'warning' | 'urgent';
  messageKey: string; // Translation key for the message
}

export const noticeConfig: Notice = {
  enabled: true, // Set to true when actively recruiting
  type: 'info',
  messageKey: 'recruitmentNotice', // Will look up 'Notice.recruitmentNotice' in translations
};
