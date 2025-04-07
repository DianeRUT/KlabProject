"use client"

import { useState, useEffect } from "react"
import AdminLayout from "../../Components/Admin/AdminLayout"
import { getStoreSettings, updateStoreSettings } from "../../api/adminApi"
import "../../styles/admin/SettingsPage.css"

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    storeName: "",
    storeEmail: "",
    storePhone: "",
    storeAddress: "",
    logo: "",
    favicon: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      pinterest: "",
    },
    shippingOptions: [
      { name: "Standard Shipping", price: 10, days: "3-5" },
      { name: "Express Shipping", price: 20, days: "1-2" },
    ],
    taxRate: 10,
    currency: "USD",
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const data = await getStoreSettings()

      if (data) {
        setSettings(data)
      }
    } catch (err) {
      console.error("Error fetching settings:", err)
      setError("Failed to load settings")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setSettings({
        ...settings,
        [parent]: {
          ...settings[parent],
          [child]: value,
        },
      })
    } else {
      setSettings({
        ...settings,
        [name]: value,
      })
    }
  }

  const handleShippingChange = (index, field, value) => {
    const updatedShipping = [...settings.shippingOptions]
    updatedShipping[index] = {
      ...updatedShipping[index],
      [field]: field === "price" ? Number.parseFloat(value) : value,
    }

    setSettings({
      ...settings,
      shippingOptions: updatedShipping,
    })
  }

  const addShippingOption = () => {
    setSettings({
      ...settings,
      shippingOptions: [...settings.shippingOptions, { name: "New Shipping Option", price: 0, days: "3-5" }],
    })
  }

  const removeShippingOption = (index) => {
    const updatedShipping = [...settings.shippingOptions]
    updatedShipping.splice(index, 1)

    setSettings({
      ...settings,
      shippingOptions: updatedShipping,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)
      setError(null)
      setSuccess(false)

      await updateStoreSettings(settings)

      setSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (err) {
      console.error("Error saving settings:", err)
      setError("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-spinner">Loading settings...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="admin-settings">
        <div className="page-header">
          <h1>Store Settings</h1>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Settings saved successfully!</div>}

        <div className="settings-tabs">
          <button
            className={`tab-btn ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`tab-btn ${activeTab === "shipping" ? "active" : ""}`}
            onClick={() => setActiveTab("shipping")}
          >
            Shipping & Tax
          </button>
          <button
            className={`tab-btn ${activeTab === "social" ? "active" : ""}`}
            onClick={() => setActiveTab("social")}
          >
            Social Media
          </button>
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          {/* General Settings */}
          <div className={`tab-content ${activeTab === "general" ? "active" : ""}`}>
            <h2>General Settings</h2>

            <div className="form-group">
              <label htmlFor="storeName">Store Name</label>
              <input type="text" id="storeName" name="storeName" value={settings.storeName} onChange={handleChange} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="storeEmail">Store Email</label>
                <input
                  type="email"
                  id="storeEmail"
                  name="storeEmail"
                  value={settings.storeEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="storePhone">Store Phone</label>
                <input
                  type="text"
                  id="storePhone"
                  name="storePhone"
                  value={settings.storePhone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="storeAddress">Store Address</label>
              <textarea
                id="storeAddress"
                name="storeAddress"
                value={settings.storeAddress}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="logo">Logo URL</label>
                <input type="text" id="logo" name="logo" value={settings.logo} onChange={handleChange} />
                {settings.logo && (
                  <div className="image-preview">
                    <img src={settings.logo || "/placeholder.svg"} alt="Logo preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="favicon">Favicon URL</label>
                <input type="text" id="favicon" name="favicon" value={settings.favicon} onChange={handleChange} />
                {settings.favicon && (
                  <div className="image-preview small">
                    <img src={settings.favicon || "/placeholder.svg"} alt="Favicon preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="currency">Currency</label>
              <select id="currency" name="currency" value={settings.currency} onChange={handleChange}>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
            </div>
          </div>

          {/* Shipping & Tax Settings */}
          <div className={`tab-content ${activeTab === "shipping" ? "active" : ""}`}>
            <h2>Shipping & Tax Settings</h2>

            <div className="shipping-options">
              <div className="section-header">
                <h3>Shipping Options</h3>
                <button type="button" className="add-btn" onClick={addShippingOption}>
                  <i className="fas fa-plus"></i> Add Option
                </button>
              </div>

              {settings.shippingOptions.map((option, index) => (
                <div key={index} className="shipping-option">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={option.name}
                        onChange={(e) => handleShippingChange(index, "name", e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Price ($)</label>
                      <input
                        type="number"
                        value={option.price}
                        onChange={(e) => handleShippingChange(index, "price", e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div className="form-group">
                      <label>Delivery Time (days)</label>
                      <input
                        type="text"
                        value={option.days}
                        onChange={(e) => handleShippingChange(index, "days", e.target.value)}
                        placeholder="e.g. 3-5"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeShippingOption(index)}
                    disabled={settings.shippingOptions.length <= 1}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label htmlFor="taxRate">Tax Rate (%)</label>
              <input
                type="number"
                id="taxRate"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
              />
              <p className="help-text">This is the default tax rate applied to all orders.</p>
            </div>
          </div>

          {/* Social Media Settings */}
          <div className={`tab-content ${activeTab === "social" ? "active" : ""}`}>
            <h2>Social Media Settings</h2>

            <div className="form-group">
              <label htmlFor="facebook">Facebook</label>
              <div className="input-with-icon">
                <i className="fab fa-facebook"></i>
                <input
                  type="text"
                  id="facebook"
                  name="socialLinks.facebook"
                  value={settings.socialLinks.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/yourstorename"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="twitter">Twitter</label>
              <div className="input-with-icon">
                <i className="fab fa-twitter"></i>
                <input
                  type="text"
                  id="twitter"
                  name="socialLinks.twitter"
                  value={settings.socialLinks.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/yourstorename"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="instagram">Instagram</label>
              <div className="input-with-icon">
                <i className="fab fa-instagram"></i>
                <input
                  type="text"
                  id="instagram"
                  name="socialLinks.instagram"
                  value={settings.socialLinks.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/yourstorename"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="pinterest">Pinterest</label>
              <div className="input-with-icon">
                <i className="fab fa-pinterest"></i>
                <input
                  type="text"
                  id="pinterest"
                  name="socialLinks.pinterest"
                  value={settings.socialLinks.pinterest}
                  onChange={handleChange}
                  placeholder="https://pinterest.com/yourstorename"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default SettingsPage

