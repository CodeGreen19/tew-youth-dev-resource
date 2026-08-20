import React from 'react'

export default async function page() {
    await new Promise((res) => setTimeout(res, 3000))
    return (
        <div>branches pagepage</div>
    )
}
