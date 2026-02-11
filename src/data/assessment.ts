export type LifecycleStage = 'POC' | 'POV' | 'Scale' | 'Decommissioning' | 'Removed'

export interface AssessmentQuestion {
  id: string
  label: string
  type: 'dropdown' | 'radio'
  options: { value: string; label: string }[]
}

export const lifecycleStages: { value: LifecycleStage; label: string }[] = [
  { value: 'POC', label: 'POC' },
  { value: 'POV', label: 'POV' },
  { value: 'Scale', label: 'Scale' },
  { value: 'Decommissioning', label: 'Decommissioning' },
  { value: 'Removed', label: 'Removed' },
]

const yesNo = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

const dataSensitivity = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'restricted', label: 'Restricted' },
]

export const questionsByPhase: Record<LifecycleStage, AssessmentQuestion[]> = {
  POC: [
    { id: 'poc-production-data', label: 'Does your POC use production data?', type: 'radio', options: yesNo },
    { id: 'poc-internet-facing', label: 'Is it internet facing?', type: 'radio', options: yesNo },
    { id: 'poc-data-sensitivity', label: "What is the sensitivity of the data?", type: 'dropdown', options: dataSensitivity },
  ],
  POV: [
    { id: 'pov-production-data', label: 'Does your POV use production data?', type: 'radio', options: yesNo },
    { id: 'pov-internet-facing', label: 'Is it internet facing?', type: 'radio', options: yesNo },
    { id: 'pov-data-sensitivity', label: "What is the sensitivity of the data?", type: 'dropdown', options: dataSensitivity },
  ],
  Scale: [
    { id: 'scale-internet-facing', label: 'Is the system internet facing?', type: 'radio', options: yesNo },
    { id: 'scale-data-sensitivity', label: "What is the sensitivity of the data?", type: 'dropdown', options: dataSensitivity },
    { id: 'scale-criticality', label: 'What is the system criticality?', type: 'dropdown', options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'critical', label: 'Critical' },
    ] },
  ],
  Decommissioning: [
    { id: 'decom-data-retention', label: 'Are there data retention or archive requirements?', type: 'radio', options: yesNo },
    { id: 'decom-handover', label: 'Is a formal handover to another team or system required?', type: 'radio', options: yesNo },
  ],
  Removed: [
    { id: 'removed-archive', label: 'Has all data been archived or disposed of per policy?', type: 'radio', options: yesNo },
  ],
}

export interface AssessmentAnswers {
  lifecycleStage: LifecycleStage
  [questionId: string]: string
}

export interface ChecklistItem {
  id: string
  label: string
  required: boolean
  note?: string
}

export function getChecklist(answers: AssessmentAnswers): ChecklistItem[] {
  const stage = answers.lifecycleStage
  const items: ChecklistItem[] = []

  if (stage === 'Removed') {
    items.push(
      { id: 'confirm-removal', label: 'Confirm system removal in ATAS', required: true },
      { id: 'archive-docs', label: 'Retain decommissioning and data disposal documentation', required: true },
    )
    return items
  }

  if (stage === 'Decommissioning') {
    items.push(
      { id: 'update-status', label: 'Update system status to Decommissioning in ATAS', required: true },
      { id: 'data-retention', label: 'Complete data retention or archive plan', required: answers['decom-data-retention'] === 'yes' },
      { id: 'handover-plan', label: 'Complete handover plan if required', required: answers['decom-handover'] === 'yes' },
      { id: 'security-review', label: 'Complete security and access review for decommissioning', required: true },
    )
    return items.filter((i) => i.required !== false)
  }

  const usesProductionData = answers['poc-production-data'] === 'yes' || answers['pov-production-data'] === 'yes'
  const internetFacing = answers['poc-internet-facing'] === 'yes' || answers['pov-internet-facing'] === 'yes' || answers['scale-internet-facing'] === 'yes'
  const sensitivity = answers['poc-data-sensitivity'] || answers['pov-data-sensitivity'] || answers['scale-data-sensitivity']
  const highSensitivity = sensitivity === 'high' || sensitivity === 'restricted'

  const needsPreApproval = (stage === 'POC' || stage === 'POV') && (usesProductionData || internetFacing || highSensitivity)

  if (needsPreApproval) {
    items.push(
      { id: 'pre-approval', label: 'Obtain pre-approval from your Agency Coordinator before registration', required: true, note: 'Required when using production data, internet-facing access, or high/restricted data.' },
    )
  }

  items.push(
    { id: 'register-system', label: 'Register your system in ATAS', required: true },
    { id: 'complete-rml', label: 'Complete Risk Materiality Level (RML) assessment', required: stage === 'Scale' || stage === 'POV' },
    { id: 'security-classification', label: 'Assign security classification to your system', required: true },
    { id: 'data-classification', label: 'Complete data/information sensitivity classification', required: true },
  )

  if (stage === 'Scale' && (answers['scale-criticality'] === 'high' || answers['scale-criticality'] === 'critical')) {
    items.push(
      { id: 'resiliency-plan', label: 'Document resiliency and availability requirements', required: true },
      { id: 'dependencies-map', label: 'Map and document system dependencies', required: true },
    )
  }

  return items
}
