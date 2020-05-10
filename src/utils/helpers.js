import React from 'react'

export const ClickWrapper = ({ children, onClick }) => (
    <React.Fragment>
        {React.Children.map(children, child => (
            React.cloneElement(child, {
                onClick,
            })
        ))}
    </React.Fragment>
)

export const formatNumber = number => new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 2 }).format(number)