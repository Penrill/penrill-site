import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { MinusIcon } from '../icons/minus-icon'
import { PlusIcon } from '../icons/plus-icon'

// Oatmeal toggles answers with Tailwind Plus Elements; a native <details> looks the same and works
// in the prerendered page without a script.

export function Faq({
  question,
  answer,
  className,
  ...props
}: { question: ReactNode; answer: ReactNode } & Omit<ComponentProps<'details'>, 'children'>) {
  return (
    <details className={clsx('group', className)} {...props}>
      <summary className="flex w-full cursor-pointer list-none items-start justify-between gap-6 py-4 text-left text-base/7 text-mist-950 dark:text-white [&::-webkit-details-marker]:hidden">
        {question}
        <PlusIcon className="h-lh shrink-0 group-open:hidden" />
        <MinusIcon className="h-lh shrink-0 not-group-open:hidden" />
      </summary>
      <div className="-mt-2 flex flex-col gap-2 pr-12 pb-4 text-sm/7 text-mist-700 dark:text-mist-400">{answer}</div>
    </details>
  )
}

export function FAQsTwoColumnAccordion({
  headline,
  subheadline,
  className,
  children,
  ...props
}: {
  headline?: ReactNode
  subheadline?: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container className="grid grid-cols-1 gap-x-2 gap-y-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Subheading>{headline}</Subheading>
          {subheadline && <Text className="flex flex-col gap-4 text-pretty">{subheadline}</Text>}
        </div>
        <div className="divide-y divide-mist-950/10 border-y border-mist-950/10 dark:divide-white/10 dark:border-white/10">
          {children}
        </div>
      </Container>
    </section>
  )
}
