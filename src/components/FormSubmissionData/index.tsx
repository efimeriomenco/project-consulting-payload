'use client'

import React from 'react'
import { useAllFormFields, ArrayField } from '@payloadcms/ui'
import type { ArrayFieldClientComponent } from 'payload'

type SubmissionDataItem = {
  field: string
  value: string
  id?: string | null
}

export const FormSubmissionDataField: ArrayFieldClientComponent = (props) => {
  const [fields] = useAllFormFields()
  
  // Get the submissionData from the form fields
  const submissionDataFields = Object.entries(fields).filter(([key]) => 
    key.startsWith('submissionData.')
  )
  
  // Parse the submission data from form fields
  const data: SubmissionDataItem[] = []
  const indices = new Set<number>()
  
  submissionDataFields.forEach(([key]) => {
    const match = key.match(/submissionData\.(\d+)\./)
    if (match) {
      indices.add(parseInt(match[1], 10))
    }
  })
  
  // Sort indices to maintain order
  const sortedIndices = Array.from(indices).sort((a, b) => a - b)
  
  sortedIndices.forEach((index) => {
    const fieldValue = fields[`submissionData.${index}.field`]?.value as string | undefined
    const valueValue = fields[`submissionData.${index}.value`]?.value as string | undefined
    const idValue = fields[`submissionData.${index}.id`]?.value as string | undefined
    
    if (fieldValue !== undefined) {
      data.push({
        field: fieldValue || '',
        value: valueValue || '',
        id: idValue,
      })
    }
  })

  return (
    <div>
      {/* Custom readable display */}
      {data.length > 0 && (
        <div style={{ 
          padding: '20px', 
          marginBottom: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <h4 style={{ 
            marginBottom: '16px', 
            fontSize: '16px', 
            fontWeight: 600,
            color: '#1a1a1a',
          }}>
            📋 Submission Details
          </h4>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '14px',
            backgroundColor: '#fff',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#e9ecef' }}>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '12px 16px',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 600,
                  color: '#495057',
                  width: '30%'
                }}>
                  Field
                </th>
                <th style={{ 
                  textAlign: 'left', 
                  padding: '12px 16px',
                  borderBottom: '2px solid #dee2e6',
                  fontWeight: 600,
                  color: '#495057'
                }}>
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr 
                  key={item.id || index}
                  style={{ 
                    backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa'
                  }}
                >
                  <td style={{ 
                    padding: '12px 16px',
                    borderBottom: '1px solid #dee2e6',
                    fontWeight: 500,
                    color: '#495057',
                  }}>
                    {formatFieldName(item.field)}
                  </td>
                  <td style={{ 
                    padding: '12px 16px',
                    borderBottom: '1px solid #dee2e6',
                    color: '#212529',
                    wordBreak: 'break-word'
                  }}>
                    {formatFieldValue(item.field, item.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Also render the default array field for raw data access if needed */}
      <details style={{ marginTop: '16px' }}>
        <summary style={{ 
          cursor: 'pointer', 
          padding: '8px 12px',
          backgroundColor: '#e9ecef',
          borderRadius: '4px',
          fontSize: '13px',
          color: '#666'
        }}>
          Show raw data fields
        </summary>
        <div style={{ marginTop: '12px' }}>
          <ArrayField {...props} />
        </div>
      </details>
    </div>
  )
}

// Format field names to be more readable
function formatFieldName(fieldName: string): string {
  return fieldName
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/[_-]/g, ' ') // Replace underscores and dashes with spaces
    .replace(/^\s+/, '') // Remove leading space
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Format field values based on field type
function formatFieldValue(fieldName: string, value: string): React.ReactNode {
  if (!value) return <span style={{ color: '#999', fontStyle: 'italic' }}>Empty</span>
  
  // Check if it's an email
  if (fieldName.toLowerCase().includes('email')) {
    return (
      <a 
        href={`mailto:${value}`} 
        style={{ color: '#0066cc', textDecoration: 'none' }}
      >
        {value}
      </a>
    )
  }
  
  // Check if it's a phone
  if (fieldName.toLowerCase().includes('phone') || fieldName.toLowerCase().includes('telefon')) {
    return (
      <a 
        href={`tel:${value.replace(/\s+/g, '')}`} 
        style={{ color: '#0066cc', textDecoration: 'none' }}
      >
        {value}
      </a>
    )
  }
  
  // Check if it's a boolean/checkbox
  if (value === 'true' || value === 'false') {
    return (
      <span style={{ 
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '4px',
        backgroundColor: value === 'true' ? '#d4edda' : '#f8d7da',
        color: value === 'true' ? '#155724' : '#721c24',
        fontWeight: 500,
        fontSize: '13px'
      }}>
        {value === 'true' ? '✓ Yes' : '✗ No'}
      </span>
    )
  }
  
  // For longer text (like messages), display with preserved whitespace
  if (value.length > 100 || value.includes('\n')) {
    return (
      <div style={{ 
        whiteSpace: 'pre-wrap',
        backgroundColor: '#f8f9fa',
        padding: '10px 14px',
        borderRadius: '4px',
        border: '1px solid #dee2e6',
        fontSize: '13px',
        lineHeight: '1.5'
      }}>
        {value}
      </div>
    )
  }
  
  return value
}

export default FormSubmissionDataField
