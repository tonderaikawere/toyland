import React, { useState } from 'react';
import { useToyStore } from '../context/ToyStoreContext';
import { ShippingAddress } from '../types';
import {
  User,
  MapPin,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Award,
  Package,
  Heart,
  X,
  Phone,
  Home
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const {
    profile,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    orders,
    wishlistIds,
    setActiveTab
  } = useToyStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Modal Form State
  const [label, setLabel] = useState<string>('Home');
  const [fullName, setFullName] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [apartment, setApartment] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const openAddModal = () => {
    setEditingAddressId(null);
    setLabel('Home');
    setFullName(profile.name);
    setStreet('');
    setApartment('');
    setCity('');
    setState('IL');
    setZipCode('');
    setPhone('+1 (555) 234-5678');
    setIsDefault(addresses.length === 0);
    setIsModalOpen(true);
  };

  const openEditModal = (addr: ShippingAddress) => {
    setEditingAddressId(addr.id);
    setLabel(addr.label);
    setFullName(addr.fullName);
    setStreet(addr.street);
    setApartment(addr.apartment || '');
    setCity(addr.city);
    setState(addr.state);
    setZipCode(addr.zipCode);
    setPhone(addr.phone);
    setIsDefault(addr.isDefault);
    setIsModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !street.trim() || !city.trim()) return;

    if (editingAddressId) {
      updateAddress(editingAddressId, {
        label,
        fullName,
        street,
        apartment,
        city,
        state,
        zipCode,
        phone,
        isDefault
      });
    } else {
      addAddress({
        label,
        fullName,
        street,
        apartment,
        city,
        state,
        zipCode,
        country: 'United States',
        phone,
        isDefault
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
      
      {/* Profile Header */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-18 h-18 rounded-full border-4 border-amber-400 object-cover shadow-md"
          />
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              {profile.name}
            </h1>
            <p className="text-xs text-amber-200/80 font-medium">{profile.email}</p>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full mt-2">
              <Award className="w-3.5 h-3.5" /> VIP Toyland Member
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-4">
          <div className="bg-slate-800 p-3.5 rounded-2xl text-center border border-slate-700 min-w-24">
            <span className="text-xl font-black text-amber-400">{profile.playPoints}</span>
            <p className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">Play Points</p>
          </div>
          <div
            onClick={() => setActiveTab('orders')}
            className="bg-slate-800 p-3.5 rounded-2xl text-center border border-slate-700 min-w-24 cursor-pointer hover:border-amber-400 transition-all"
          >
            <span className="text-xl font-black text-amber-400">{orders.length}</span>
            <p className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">Orders</p>
          </div>
          <div
            onClick={() => setActiveTab('wishlist')}
            className="bg-slate-800 p-3.5 rounded-2xl text-center border border-slate-700 min-w-24 cursor-pointer hover:border-amber-400 transition-all"
          >
            <span className="text-xl font-black text-amber-400">{wishlistIds.length}</span>
            <p className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">Wishlist</p>
          </div>
        </div>
      </div>

      {/* MANAGING SHIPPING ADDRESSES SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" /> Managing Shipping Addresses
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Save addresses for home, grandparents, or birthday party gift deliveries.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-black rounded-full flex items-center gap-1.5 self-start sm:self-auto shadow-md transition-transform active:scale-95"
            id="add-address-profile-btn"
          >
            <Plus className="w-4 h-4 text-amber-400" /> Add New Address
          </button>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addresses.map(addr => (
            <div
              key={addr.id}
              className={`p-5 rounded-2xl border-2 transition-all relative flex flex-col justify-between ${
                addr.isDefault
                  ? 'border-slate-900 bg-amber-50/50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-amber-600" /> {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-extrabold bg-slate-900 text-amber-300 px-2.5 py-0.5 rounded-full">
                      Default Shipping
                    </span>
                  )}
                </div>

                <p className="text-xs font-bold text-slate-800 mt-2">{addr.fullName}</p>
                <p className="text-xs text-slate-600">{addr.street} {addr.apartment && `, ${addr.apartment}`}</p>
                <p className="text-xs text-slate-600">{addr.city}, {addr.state} {addr.zipCode}</p>
                <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-2">
                  <Phone className="w-3 h-3 text-slate-400" /> {addr.phone}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                {!addr.isDefault ? (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[11px] font-bold text-amber-900 hover:underline"
                    id={`set-default-${addr.id}`}
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Primary
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(addr)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                    title="Edit Address"
                    id={`edit-addr-${addr.id}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {addresses.length > 1 && (
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                      title="Delete Address"
                      id={`delete-addr-${addr.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD / EDIT ADDRESS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <h3 className="text-base font-black text-slate-900">
                {editingAddressId ? 'Edit Shipping Address' : 'Add New Shipping Address'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800"
                id="close-address-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Address Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Home, Grandma's House, Work"
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  id="modal-address-label-input"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Recipient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full name for courier delivery"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  id="modal-recipient-name-input"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="House number & street name"
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  id="modal-street-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Apt / Suite (Optional)</label>
                  <input
                    type="text"
                    placeholder="Apt 4B"
                    value={apartment}
                    onChange={e => setApartment(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Zip Code</label>
                  <input
                    type="text"
                    required
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={e => setIsDefault(e.target.checked)}
                  className="w-4 h-4 accent-slate-900 rounded"
                />
                <span className="font-bold text-slate-800">Set as primary default address</span>
              </label>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-black rounded-xl shadow-md"
                  id="save-address-submit-btn"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
