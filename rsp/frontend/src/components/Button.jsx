import React from 'react'

const Button = ({ children, loading, ...props }) => {
  return (
    <div>
      <button disabled={loading} {...props}>
        {loading ? 'Please wait...' : children}
      </button>
    </div>
  )
}

export default Button
