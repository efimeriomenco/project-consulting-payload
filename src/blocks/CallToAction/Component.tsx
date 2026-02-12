'use client'

import React, { useState } from 'react'
import type { Page } from '@/payload-types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormBlock } from '@/blocks/Form/Component'

type Props = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CallToActionBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ title, description, primaryButton, secondaryButton }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedForm, setSelectedForm] = useState<FormType | null>(null)
  const [formTitle, setFormTitle] = useState('')

  const handleOpenForm = (form: any, buttonLabel: string) => {
    if (form && typeof form === 'object') {
      setSelectedForm(form as FormType)
      setFormTitle(form.title || buttonLabel)
      setIsFormOpen(true)
    }
  }

  return (
    <div className="container mx-auto">
      <div className="bg-[#E1E8F0] rounded-3xl py-12 px-8 flex flex-col items-center justify-center text-center">
        {/* Title */}
        {title && (
          <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-[#051229] mb-4 max-w-4xl">
            {title}
          </h2>
        )}
        
        {/* Description */}
        {description && (
          <p className="font-montserrat text-sm md:text-base text-gray-600 mb-8 max-w-4xl">
            {description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {primaryButton?.label && (
            <Button
              onClick={() => handleOpenForm(primaryButton.form, primaryButton.label || '')}
              className="bg-accent-foreground hover:bg-primary/90 text-white font-montserrat px-8 py-3"
            >
              {primaryButton.label}
            </Button>
          )}
          {secondaryButton?.label && (
            <Button
              variant="outline"
              onClick={() => handleOpenForm(secondaryButton.form, secondaryButton.label || '')}
              className="border-[#1A3275] text-[#1A3275] hover:bg-[#1A3275]/10 font-montserrat px-8 py-3"
            >
              {secondaryButton.label}
            </Button>
          )}
        </div>
      </div>

      {/* Contact Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-montserrat text-2xl">
              {formTitle}
            </DialogTitle>
          </DialogHeader>
          {selectedForm && (
            <FormBlock
              blockType="formBlock"
              enableIntro={false}
              form={selectedForm}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
