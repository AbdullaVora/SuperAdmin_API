const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/database');
const loginRoute = require("./routers/auth/userRoute")
const categoryRoute = require("./routers/Dashboard/product_config/categoryRoute")
const variantsRoute = require("./routers/Dashboard/product_config/variantsRoute")
const brandRoute = require("./routers/Dashboard/product_config/brandRoute")
const sliderRoute = require("./routers/Dashboard/banner_config/sliderRoute")
const bannerRoute = require("./routers/Dashboard/banner_config/bannerRoute")
const couponRoute = require("./routers/Dashboard/banner_config/couponRoute")
const orderStatusRoute = require("./routers/Dashboard/orders_config/orderStatusRoute");
const paymentMethodRoute = require("./routers/Dashboard/website_config/paymentMethodRoute");
const shippinPartnerRoute = require("./routers/Dashboard/website_config/shipingPartnerRoute");
const socialLinksRoute = require("./routers/Dashboard/website_config/socialLinksRoute");
const productRoute = require("./routers/Dashboard/product/productRoute")

// Middleware to parse JSON requests
app.use(express.json({ limit: "300mb" }));
app.use(express.urlencoded({ extended: true, limit: "300mb" }));

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:5173",
            "https://superadmin-qmet.onrender.com"
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error("Not allowed by CORS")); // Block the request
        }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true // Allow credentials if using cookies or authentication headers
};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://superadmin-qmet.onrender.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(cors(corsOptions));
// ✅ Ensure uploads directory exists on startup
const uploadDir = path.join(__dirname, 'uploads');

const ensureUploadsDirectory = () => {
    try {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
            console.log('✅ "uploads" directory created.');
        } else {
            console.log('📂 "uploads" directory already exists.');
        }
    } catch (error) {
        console.error('❌ Error creating "uploads" directory:', error);
    }
};

// Call function to ensure uploads directory exists
ensureUploadsDirectory();

// ✅ Serve static files from uploads directory
app.use('/uploads', express.static(uploadDir))

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/api/auth", loginRoute)
app.use("/api/dashboard", categoryRoute)
app.use("/api/dashboard", variantsRoute)
app.use("/api/dashboard", brandRoute)
app.use("/api/dashboard", sliderRoute)
app.use("/api/dashboard", bannerRoute)
app.use("/api/dashboard", couponRoute)
app.use("/api/dashboard", orderStatusRoute)
app.use("/api/dashboard", paymentMethodRoute)
app.use("/api/dashboard", shippinPartnerRoute)
app.use("/api/dashboard", socialLinksRoute)
app.use("/api/dashboard", productRoute)

// Start the server
app.listen(PORT, (err) => {
    if (err) console.error(err);
    else connectDB(); console.log(`Server is running on http://localhost:${PORT}`);

});
