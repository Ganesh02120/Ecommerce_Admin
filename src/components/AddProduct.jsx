import React, { useState } from 'react';
import { FiBox, FiTag, FiDollarSign, FiPercent, FiChevronRight, FiChevronLeft, FiImage, FiHash, FiUser, FiLayers } from 'react-icons/fi';
import { toast } from 'react-toastify';

const GENDERS = ['Unisex', 'Male', 'Female', 'Kids'];
const COLORS = [
  { id: 1, name: 'Red' },
  { id: 2, name: 'Blue' },
  { id: 3, name: 'Green' },
  { id: 4, name: 'Black' },
  { id: 5, name: 'White' },
];

const AddProduct = () => {
  // Step state
  const [step, setStep] = useState(1);

  // Step 1: Basic Info
  const [basicInfo, setBasicInfo] = useState({
    productName: '',
    attributeTypeId: '',
    brandId: '',
    description: '',
    mrp: '',
    discount: '',
    gender: '',
  });
  const [basicErrors, setBasicErrors] = useState({});

  // Step 2: Variants
  const [variants, setVariants] = useState([
    {
      colorId: '',
      attributeValues: '',
      quantity: '',
      sellingPrice: '',
      images: [],
      imagePreviews: [],
    },
  ]);
  const [variantErrors, setVariantErrors] = useState([{}]);

  // Handle input changes
  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (idx, e) => {
    const { name, value } = e.target;
    setVariants((prev) => {
      const updated = [...prev];
      updated[idx][name] = value;
      return updated;
    });
  };

  const handleVariantImage = (idx, e) => {
    const files = Array.from(e.target.files);
    setVariants((prev) => {
      const updated = [...prev];
      updated[idx].images = files;
      updated[idx].imagePreviews = files.map((file) => URL.createObjectURL(file));
      return updated;
    });
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { colorId: '', attributeValues: '', quantity: '', sellingPrice: '', images: [], imagePreviews: [] },
    ]);
    setVariantErrors((prev) => [...prev, {}]);
  };

  const removeVariant = (idx) => {
    setVariants((prev) => prev.filter((_, i) => i !== idx));
    setVariantErrors((prev) => prev.filter((_, i) => i !== idx));
  };

  // Validation
  const validateBasic = () => {
    const errors = {};
    if (!basicInfo.productName.trim()) errors.productName = 'Product name is required';
    if (!basicInfo.attributeTypeId.trim()) errors.attributeTypeId = 'Attribute Type ID is required';
    if (!basicInfo.brandId.trim()) errors.brandId = 'Brand ID is required';
    if (!basicInfo.description.trim()) errors.description = 'Description is required';
    if (!basicInfo.mrp || isNaN(basicInfo.mrp) || Number(basicInfo.mrp) <= 0) errors.mrp = 'Valid MRP is required';
    if (basicInfo.discount && (isNaN(basicInfo.discount) || Number(basicInfo.discount) < 0)) errors.discount = 'Discount must be 0 or more';
    if (!basicInfo.gender) errors.gender = 'Gender is required';
    setBasicErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateVariants = () => {
    const errorsArr = variants.map((variant) => {
      const errors = {};
      if (!variant.colorId) errors.colorId = 'Color is required';
      if (!variant.attributeValues.trim()) errors.attributeValues = 'Attribute values required';
      if (!variant.quantity || isNaN(variant.quantity) || Number(variant.quantity) < 0) errors.quantity = 'Valid quantity required';
      if (!variant.sellingPrice || isNaN(variant.sellingPrice) || Number(variant.sellingPrice) <= 0) errors.sellingPrice = 'Valid selling price required';
      if (!variant.images.length) errors.images = 'At least one image required';
      return errors;
    });
    setVariantErrors(errorsArr);
    return errorsArr.every((err) => Object.keys(err).length === 0);
  };

  // Navigation
  const handleNext = () => {
    if (step === 1 && validateBasic()) setStep(2);
    if (step === 2 && validateVariants()) handleSubmit();
  };
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  // Submit
  const handleSubmit = () => {
    toast.success('Product added successfully!');
    // Reset form or redirect as needed
  };

  return (
    <div className="ml-60 bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <div className="bg-gray-100 rounded-none  w-full p-12">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Add Product</h2>
        <div className="flex items-center gap-3 mb-10">
          <div className={`h-3 w-3 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <span className={`text-lg font-semibold ${step === 1 ? 'text-blue-600' : 'text-gray-400'}`}>Basic Info</span>
          <FiChevronRight className="text-gray-400 text-xl" />
          <div className={`h-3 w-3 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <span className={`text-lg font-semibold ${step === 2 ? 'text-blue-600' : 'text-gray-400'}`}>Product Variants</span>
        </div>

        {step === 1 && (
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Product Name</label>
                <div className="relative">
                  <FiBox className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="productName"
                    value={basicInfo.productName}
                    onChange={handleBasicChange}
                    className={`pl-12 pr-4 py-3 w-full border rounded-lg text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${basicErrors.productName ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Enter product name"
                  />
                  {basicErrors.productName && <p className="text-xs text-red-500 mt-1">{basicErrors.productName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Attribute Type ID</label>
                <div className="relative">
                  <FiHash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="attributeTypeId"
                    value={basicInfo.attributeTypeId}
                    onChange={handleBasicChange}
                    className={`pl-12 pr-4 py-3 w-full border rounded-lg text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${basicErrors.attributeTypeId ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Enter attribute type id"
                  />
                  {basicErrors.attributeTypeId && <p className="text-xs text-red-500 mt-1">{basicErrors.attributeTypeId}</p>}
                </div>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Brand ID</label>
                <div className="relative">
                  <FiLayers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="brandId"
                    value={basicInfo.brandId}
                    onChange={handleBasicChange}
                    className={`pl-12 pr-4 py-3 w-full border rounded-lg text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${basicErrors.brandId ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Enter brand id"
                  />
                  {basicErrors.brandId && <p className="text-xs text-red-500 mt-1">{basicErrors.brandId}</p>}
                </div>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Gender</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <select
                    name="gender"
                    value={basicInfo.gender}
                    onChange={handleBasicChange}
                    className={`pl-12 pr-4 py-3 w-full border rounded-lg text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${basicErrors.gender ? 'border-red-500' : 'border-gray-200'}`}
                  >
                    <option value="">Select gender</option>
                    {GENDERS.map((g) => <option key={g}>{g}</option>)}
                  </select>
                  {basicErrors.gender && <p className="text-xs text-red-500 mt-1">{basicErrors.gender}</p>}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-base font-medium text-gray-700 mb-2">Product Description</label>
                <textarea
                  name="description"
                  value={basicInfo.description}
                  onChange={handleBasicChange}
                  className={`px-4 py-3 w-full border rounded-lg text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${basicErrors.description ? 'border-red-500' : 'border-gray-200'}`}
                  rows={4}
                  placeholder="Enter product description"
                />
                {basicErrors.description && <p className="text-xs text-red-500 mt-1">{basicErrors.description}</p>}
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">MRP</label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="number"
                    name="mrp"
                    value={basicInfo.mrp}
                    onChange={handleBasicChange}
                    className={`pl-12 pr-4 py-3 w-full border rounded-lg text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${basicErrors.mrp ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Enter MRP"
                  />
                  {basicErrors.mrp && <p className="text-xs text-red-500 mt-1">{basicErrors.mrp}</p>}
                </div>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">Product Discount (%)</label>
                <div className="relative">
                  <FiPercent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="number"
                    name="discount"
                    value={basicInfo.discount}
                    onChange={handleBasicChange}
                    className={`pl-12 pr-4 py-3 w-full border rounded-lg text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${basicErrors.discount ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Enter discount"
                  />
                  {basicErrors.discount && <p className="text-xs text-red-500 mt-1">{basicErrors.discount}</p>}
                </div>
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-10">
            {variants.map((variant, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-6 mb-4 bg-gray-50 relative">
                {variants.length > 1 && (
                  <button type="button" className="absolute top-3 right-3 text-sm text-red-500 hover:underline" onClick={() => removeVariant(idx)}>
                    Remove
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Color</label>
                    <select
                      name="colorId"
                      value={variant.colorId}
                      onChange={(e) => handleVariantChange(idx, e)}
                      className={`w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${variantErrors[idx]?.colorId ? 'border-red-500' : 'border-gray-200'}`}
                    >
                      <option value="">Select color</option>
                      {COLORS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    {variantErrors[idx]?.colorId && <p className="text-xs text-red-500 mt-1">{variantErrors[idx].colorId}</p>}
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Attribute Values</label>
                    <input
                      type="text"
                      name="attributeValues"
                      value={variant.attributeValues}
                      onChange={(e) => handleVariantChange(idx, e)}
                      className={`w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${variantErrors[idx]?.attributeValues ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="e.g. Size: M, Material: Cotton"
                    />
                    {variantErrors[idx]?.attributeValues && <p className="text-xs text-red-500 mt-1">{variantErrors[idx].attributeValues}</p>}
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={variant.quantity}
                      onChange={(e) => handleVariantChange(idx, e)}
                      className={`w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${variantErrors[idx]?.quantity ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter quantity"
                    />
                    {variantErrors[idx]?.quantity && <p className="text-xs text-red-500 mt-1">{variantErrors[idx].quantity}</p>}
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Selling Price</label>
                    <input
                      type="number"
                      name="sellingPrice"
                      value={variant.sellingPrice}
                      onChange={(e) => handleVariantChange(idx, e)}
                      className={`w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${variantErrors[idx]?.sellingPrice ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter selling price"
                    />
                    {variantErrors[idx]?.sellingPrice && <p className="text-xs text-red-500 mt-1">{variantErrors[idx].sellingPrice}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-base font-medium text-gray-700 mb-2">Images</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleVariantImage(idx, e)}
                      className="w-full border rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                    />
                    {variantErrors[idx]?.images && <p className="text-xs text-red-500 mt-1">{variantErrors[idx].images}</p>}
                    <div className="flex flex-wrap gap-3 mt-3">
                      {variant.imagePreviews.map((src, i) => (
                        <img key={i} src={src} alt="Preview" className="w-20 h-20 object-cover rounded border" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" onClick={addVariant} className="mt-2 px-6 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-semibold text-base">
              + Add Another Variant
            </button>
          </form>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold flex items-center text-base"
            >
              <FiChevronLeft className="mr-2 text-lg" /> Back
            </button>
          ) : <div />}
          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center text-base"
          >
            {step === 1 ? 'Next' : 'Add Product'} <FiChevronRight className="ml-2 text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
