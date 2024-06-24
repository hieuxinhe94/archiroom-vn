import React from 'react'

export const TypeOfGenerateButton = ({
    isSimpleGenerate,
    setIsSimpleGenerate,
}: {
    isSimpleGenerate: boolean
    setIsSimpleGenerate: (value: boolean) => void
}) => {
    const handleToggle = () => {
        setIsSimpleGenerate(!isSimpleGenerate)
    }

    return (
        <button
            onClick={handleToggle}
            className={isSimpleGenerate ? 'toggled' : ''}
        >
            {isSimpleGenerate ? 'Simple' : 'Advance'}
        </button>
    )
}
