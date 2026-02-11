export type LifecycleStepId = 'poc' | 'pov' | 'scale' | 'decommissioning' | 'removed'

export interface LifecycleStep {
  id: LifecycleStepId
  label: string
  criteria: string[]
}

export type PocTimelineItemType = 'step' | 'milestone' | 'transition'

export interface PocTimelineItem {
  type: PocTimelineItemType
  label: string
}

/** Vertical timeline for POC phase: considerations (steps), milestones, and final transition to POV. */
export const pocTimelineItems: PocTimelineItem[] = [
  { type: 'step', label: 'Get approval from CIO to proceed with POC' },
  { type: 'milestone', label: 'Budget approved' },
  { type: 'step', label: 'Document scope, objectives, and success criteria' },
  { type: 'step', label: 'Confirm use of synthetic or sample data (or obtain pre-approval for production data)' },
  { type: 'milestone', label: 'Security review passed (if internet-facing or sensitive data)' },
  { type: 'step', label: 'Register system in ATAS when ready to move beyond POC' },
  { type: 'milestone', label: 'POC evaluation complete; success criteria met' },
  { type: 'transition', label: 'System is ready to transition to POV' },
]

export const systemLifecycleSteps: LifecycleStep[] = [
  {
    id: 'poc',
    label: 'POC',
    criteria: [
      'System is not in production use; used for proof of concept only.',
      'Use synthetic or sample data where possible; production data requires Agency Coordinator pre-approval.',
      'Document scope, objectives, and success criteria for the POC.',
      'If internet-facing or using sensitive data, complete a security review before go-live.',
      'Register the system in ATAS when moving to POV or Scale.',
    ],
  },
  {
    id: 'pov',
    label: 'POV',
    criteria: [
      'Define a clear scope and evaluation period for the proof of value.',
      'If using production data: obtain Agency Coordinator pre-approval before starting.',
      'If internet-facing: document security controls and access management.',
      'Classify data sensitivity (Low / Medium / High / Restricted) and handle data accordingly.',
      'Complete Risk Materiality Level (RML) assessment before scaling to production.',
    ],
  },
  {
    id: 'scale',
    label: 'Scale',
    criteria: [
      'System is in production or scaling to production; full governance applies.',
      'Register the system in ATAS and keep registration up to date.',
      'Complete and maintain RML, security classification, and data/information sensitivity classification.',
      'Document system components, dependencies, and hosting environment.',
      'For critical or high-criticality systems: document resiliency and availability requirements.',
    ],
  },
  {
    id: 'decommissioning',
    label: 'Decommissioning',
    criteria: [
      'Update system status to Decommissioning in ATAS.',
      'If there are data retention or archive requirements, complete and execute a retention/archive plan.',
      'If handover to another team or system is required, complete a formal handover plan.',
      'Complete a security and access review for decommissioning (revoke access, secure data).',
      'Dispose of or archive data in line with agency data disposal policy.',
    ],
  },
  {
    id: 'removed',
    label: 'Removed',
    criteria: [
      'System is fully decommissioned and removed from operations.',
      'Confirm system removal in ATAS and update any related dependencies.',
      'Retain decommissioning and data disposal documentation as per policy.',
      'Ensure no active access or production data remains.',
    ],
  },
]
