import axios from "axios";

const postCustomer = async (customerData) => {
    try {
        const response = await axios.post("https://api.enrico.uz/api/v1/customers/", {
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            extra_info: customerData.extra_info || {}, // Default to empty object if not provided
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Customer added successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding customer:", error.response?.data || error.message);
        throw error;
    }
};

export default postCustomer;


