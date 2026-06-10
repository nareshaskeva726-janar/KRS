import Product from "../models/productModel.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {

    // console.log(req.files);
    // console.log("IMAGES FROM SERVER:", req.files?.images);


    const { name, price, category, qty, videoDescription, } = req.body;

    if (!name || !price || !category || !qty) {
      return res.status(400).json({ success: false, message: "Missing Details!" })
    }

    const image = req.files?.image?.[0]?.path;

    const images = req.files?.images?.map((file) => file.path);

    const video = req.files?.video?.[0]?.path;


    const product = await Product.create({
      name,
      price,
      category,
      qty,
      image,
      images,
      video,
      videoDescription,
    });

    res.status(201).json({ success: true, message: "Product created successfully!", product });

  } catch (err) {
    console.log("Error in the createProduct controller", err)
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ success: true, message: "Products fetched successfully!", products })

  } catch (error) {

    console.log("Error in the getProducts controller", error);

    res.status(500).json({ success: false, message: error.message })
  }
};

// GET ONE PRODUCT
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // CHECK ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // FIND PRODUCT
    const product = await Product.findById(id);

    // CHECK PRODUCT EXISTS
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // SUCCESS RESPONSE
    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.log("Error in getProduct controller:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ── TEXT FIELDS ─────────────────────────────
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.qty = req.body.qty || product.qty;
    product.video = req.files?.video?.[0]?.path || product.video;
    product.videoDescription = req.body.videoDescription || product.videoDescription;

    // ── IMAGE (single) ──────────────────────────
    if (req.files?.image?.[0]) {
      product.image = req.files.image[0].path;
    }

    // ── GALLERY IMAGES ──────────────────────────
    if (req.files?.images?.length) {
      const newImages = req.files.images.map((f) => f.path);
      product.images = [...(product.images || []), ...newImages];
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    console.log("Error in updateProduct controller:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // CHECK ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // FIND & DELETE
    const product = await Product.findByIdAndDelete(id);

    // CHECK PRODUCT EXISTS
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // SUCCESS RESPONSE
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log("Error in deleteProduct controller:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};