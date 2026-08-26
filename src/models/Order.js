import mongoose from 'mongoose';

const vendorSubOrderSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'], 
    default: 'PENDING' 
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  }],
  vendorSubtotal: Number,
  vendorShippingFee: Number
}, { _id: true });

const parentOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shippingAddress: { type: Object, required: true }, // Address Snapshot
  billingAddress: { type: Object, required: true },
  
  // Total Pricing Summary
  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, required: true },
  tax: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  platformFee: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  
  // Split Vendor Fulfillments
  vendorOrders: [vendorSubOrderSchema]
}, { timestamps: true });

export const ParentOrder = mongoose.model('ParentOrder', parentOrderSchema);