import { useEffect, useRef, useState, ReactNode } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface LongTextProps {
    children: ReactNode
    className?: string
    contentClassName?: string
}

export default function LongText({
    children,
    className = '',
    contentClassName = '',
}: LongTextProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isOverflown, setIsOverflown] = useState(false)

    useEffect(() => {
        if (checkOverflow(ref.current)) {
            setIsOverflown(true)
        } else {
            setIsOverflown(false)
        }
    }, [])

    if (!isOverflown)
        return (
            <div ref={ref} className={cn('truncate', className)}>
                {children}
            </div>
        )

    return (
        <>
            <div className="hidden sm:block">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div ref={ref} className={cn('truncate', className)}>
                                {children}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className={contentClassName}>{children}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="sm:hidden">
                <Popover>
                    <PopoverTrigger asChild>
                        <div ref={ref} className={cn('truncate', className)}>
                            {children}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className={cn('w-fit', contentClassName)}>
                        <p>{children}</p>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    )
}

function checkOverflow(element: HTMLDivElement | null): boolean {
    if (element) {
        return (
            element.offsetHeight < element.scrollHeight ||
            element.offsetWidth < element.scrollWidth
        )
    }
    return false
}
