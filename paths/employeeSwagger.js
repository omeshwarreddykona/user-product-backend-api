const employeeSwagger = {
    "/create-employee": {
        post: {
            tags: ["Employee Service"],
            summary: "Create employee",
            description:
                "Creates a new employee after validating firstName, email, countryCode, phoneNo, designation, and department. It also validates phone number format and checks duplicate email and phone number.",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: [
                                "firstName",
                                "email",
                                "countryCode",
                                "phoneNo",
                                "designation",
                                "department",
                            ],
                            properties: {
                                firstName: {
                                    type: "string",
                                    example: "Omeshwar",
                                },
                                lastName: {
                                    type: "string",
                                    example: "Reddy",
                                },
                                displayName: {
                                    type: "string",
                                    example: "Omeshwar Reddy",
                                },
                                email: {
                                    type: "string",
                                    example: "[omeshwar@example.com](mailto:omeshwar@example.com)",
                                },
                                countryCode: {
                                    type: "string",
                                    example: "IN",
                                    description:
                                        "Country code used for phone number validation. Example: IN for India.",
                                },
                                phoneNo: {
                                    type: "string",
                                    example: "7569066167",
                                },
                                designation: {
                                    type: "string",
                                    example: "Backend Developer",
                                },
                                department: {
                                    type: "string",
                                    example: "Engineering",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Employee created successfully",
                    content: {
                        "application/json": {
                            example: {
                                code: 200,
                                message: "Employee created successfully",
                            },
                        },
                    },
                },
                400: {
                    description:
                        "Validation error, invalid phone number, duplicate email, or duplicate phone number",
                    content: {
                        "application/json": {
                            examples: {
                                firstNameRequired: {
                                    value: {
                                        code: 400,
                                        message: "Please Enter Name",
                                    },
                                },
                                invalidEmail: {
                                    value: {
                                        code: 400,
                                        message: "Please enter the valid email",
                                    },
                                },
                                countryCodeRequired: {
                                    value: {
                                        code: 400,
                                        message: "Please select the countrycode",
                                    },
                                },
                                phoneNoRequired: {
                                    value: {
                                        code: 400,
                                        message: "Please enter the mobile number",
                                    },
                                },
                                designationRequired: {
                                    value: {
                                        code: 400,
                                        message: "PLease enter the designation",
                                    },
                                },
                                departmentRequired: {
                                    value: {
                                        code: 400,
                                        message: "Please enter the department",
                                    },
                                },
                                invalidPhone: {
                                    value: {
                                        code: 400,
                                        message: "Invalid Number for the selcted country",
                                    },
                                },
                                duplicateEmail: {
                                    value: {
                                        code: 400,
                                        message: "User already existed, Please change your email",
                                    },
                                },
                                duplicatePhone: {
                                    value: {
                                        code: 400,
                                        message: "Phone Number exists,Please enter another number",
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: "Server error",
                    content: {
                        "application/json": {
                            example: {
                                code: 500,
                                message: "Something went wrong",
                            },
                        },
                    },
                },
            },
        },
    },

    "/get-all-employees": {
        get: {
            tags: ["Employee Service"],
            summary: "Get all employees",
            description:
                "Fetches all active employees where deleted_at is null. Supports pagination and search by firstName or email.",
            parameters: [
                {
                    in: "query",
                    name: "page",
                    required: false,
                    schema: {
                        type: "integer",
                        default: 1,
                    },
                    example: 1,
                    description: "Page number",
                },
                {
                    in: "query",
                    name: "limit",
                    required: false,
                    schema: {
                        type: "integer",
                        default: 10,
                    },
                    example: 10,
                    description: "Number of employees per page",
                },
                {
                    in: "query",
                    name: "search",
                    required: false,
                    schema: {
                        type: "string",
                    },
                    example: "omeshwar",
                    description: "Search employee by firstName or email",
                },
            ],
            responses: {
                200: {
                    description: "Employees fetched successfully",
                    content: {
                        "application/json": {
                            example: [
                                {
                                    _id: null,
                                    docs: [
                                        {
                                            _id: "65f1a2b3c4d5e6f789012345",
                                            firstName: "Omeshwar",
                                            lastName: "Reddy",
                                            displayName: "Omeshwar Reddy",
                                            email: "[omeshwar@example.com](mailto:omeshwar@example.com)",
                                            countryCode: "IN",
                                            phoneNo: "+917569066167",
                                            designation: "Backend Developer",
                                            department: "Engineering",
                                            deleted_at: null,
                                        },
                                    ],
                                    headers: {
                                        total_count: 1,
                                        total_pages: 1,
                                        current_page: 1,
                                        limit: 10,
                                    },
                                },
                            ],
                        },
                    },
                },
                500: {
                    description: "Server error",
                    content: {
                        "application/json": {
                            example: {
                                code: 500,
                                message: "Something went wrong",
                            },
                        },
                    },
                },
            },
        },
    },

    "/get-Employee-id/{id}": {
        get: {
            tags: ["Employee Service"],
            summary: "Get employee by ID",
            description:
                "Fetches a single employee by MongoDB ObjectId. Use this only if the get employee by ID route is enabled in your router.",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    example: "65f1a2b3c4d5e6f789012345",
                    description: "MongoDB Employee ObjectId",
                },
            ],
            responses: {
                200: {
                    description: "Employee fetched successfully",
                    content: {
                        "application/json": {
                            example: {
                                success: true,
                                message: "we get the data by ID",
                                data: {
                                    _id: "65f1a2b3c4d5e6f789012345",
                                    firstName: "Omeshwar",
                                    lastName: "Reddy",
                                    displayName: "Omeshwar Reddy",
                                    email: "[omeshwar@example.com](mailto:omeshwar@example.com)",
                                    countryCode: "IN",
                                    phoneNo: "+917569066167",
                                    designation: "Backend Developer",
                                    department: "Engineering",
                                    deleted_at: null,
                                },
                            },
                        },
                    },
                },
                422: {
                    description: "Employee ID does not exist",
                    content: {
                        "application/json": {
                            example: {
                                success: false,
                                message: "The Id does not exist",
                            },
                        },
                    },
                },
            },
        },
    },

    "/update-employee-id/{id}": {
        put: {
            tags: ["Employee Service"],
            summary: "Update employee by ID",
            description:
                "Updates employee details using MongoDB ObjectId. You can update firstName, lastName, displayName, email, countryCode, phoneNo, designation, and department.",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    example: "65f1a2b3c4d5e6f789012345",
                    description: "MongoDB Employee ObjectId",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                firstName: {
                                    type: "string",
                                    example: "Updated Omeshwar",
                                },
                                lastName: {
                                    type: "string",
                                    example: "Reddy",
                                },
                                displayName: {
                                    type: "string",
                                    example: "Updated Omeshwar Reddy",
                                },
                                email: {
                                    type: "string",
                                    example: "[updated@example.com](mailto:updated@example.com)",
                                },
                                countryCode: {
                                    type: "string",
                                    example: "IN",
                                },
                                phoneNo: {
                                    type: "string",
                                    example: "7569066167",
                                },
                                designation: {
                                    type: "string",
                                    example: "Software Engineer",
                                },
                                department: {
                                    type: "string",
                                    example: "Backend Engineering",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Employee updated successfully",
                    content: {
                        "application/json": {
                            example: {
                                code: 200,
                                message: "Employee data updated successfully",
                            },
                        },
                    },
                },
                404: {
                    description: "Employee not found",
                    content: {
                        "application/json": {
                            example: {
                                code: 404,
                                message: "Employee not found",
                            },
                        },
                    },
                },
                500: {
                    description: "Server error",
                    content: {
                        "application/json": {
                            example: {
                                code: 500,
                                message: "Something went wrong",
                            },
                        },
                    },
                },
            },
        },
    },

    "/delete-employee-id/{id}": {
        delete: {
            tags: ["Employee Service"],
            summary: "Soft delete employee by ID",
            description:
                "Soft deletes an employee by updating deleted_at with the current date instead of permanently deleting the record.",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string",
                    },
                    example: "65f1a2b3c4d5e6f789012345",
                    description: "MongoDB Employee ObjectId",
                },
            ],
            responses: {
                200: {
                    description: "Employee deleted successfully",
                    content: {
                        "application/json": {
                            example: {
                                code: 200,
                                message: "Empolyee deleted successfully",
                            },
                        },
                    },
                },
                404: {
                    description: "Employee not found",
                    content: {
                        "application/json": {
                            example: {
                                code: 404,
                                message: "Employee not found",
                            },
                        },
                    },
                },
                500: {
                    description: "Server error",
                    content: {
                        "application/json": {
                            example: {
                                code: 500,
                                message: "Something went wrong",
                            },
                        },
                    },
                },
            },
        },
    },
};

export default employeeSwagger;
