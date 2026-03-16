Employee Insights Dashboard

A full-stack style Employee Insights Dashboard built with React + Tailwind CSS that demonstrates authentication, high-performance data rendering, identity verification using browser APIs, and analytics visualization.

This project was developed as part of an engineering assessment focused on DOM manipulation, performance optimization, and state synchronization.

Live Features

The application consists of four main screens:

Login

Employee List (Virtualized Table)

Employee Identity Verification

Analytics Dashboard

Tech Stack

Frontend

React

React Router

Context API

Tailwind CSS

SVG for charts

HTML5 Canvas

Camera API (MediaDevices)

Visualization

Custom SVG Bar Chart

Leaflet Map for geospatial visualization

State Management

React Context API

Storage

localStorage (session persistence)

Authentication System

Login credentials:

Username: testuser
Password: Test123
Features

Persistent authentication using Context API

Session persistence using localStorage

Route protection using ProtectedRoute

Unauthorized access prevention

Security Behavior
Scenario	Result
User visits /list without login	Redirect to /login
User refreshes page	Session persists
User logs out	Redirect to login
High Performance Employee Grid (List Page)

Employee data is fetched from:

POST https://backend.jotish.in/backend_dev/gettabledata.php

Payload:

{
  "username": "test",
  "password": "123456"
}

Since the dataset can be large, the application implements custom virtualization to improve rendering performance.

Virtualization Concept

Instead of rendering the entire dataset, the application renders only:

visible rows + small buffer

This significantly reduces DOM nodes and improves performance.

Virtualization Math (Technical Explanation)

Each row has a fixed height.

rowHeight = 60px
containerHeight = 500px
Calculate number of visible rows
visibleCount = containerHeight / rowHeight

Example:

500 / 60 ≈ 8 rows
Calculate starting index

Based on scroll position:

startIndex = floor(scrollTop / rowHeight)
Calculate ending index
endIndex = startIndex + visibleCount + buffer

Buffer is used to prevent flickering during scrolling.

Example:

buffer = 5
Final rendered slice
data.slice(startIndex, endIndex)
Row Positioning

Rows are positioned using absolute positioning.

top = index * rowHeight

This simulates a full list while rendering only a small portion of DOM elements.

Identity Verification (Details Page)

This page demonstrates native browser APIs.

Features

Camera access using MediaDevices API

Photo capture using Canvas

Signature overlay directly on the captured photo

Photo + signature merged into a single Base64 image

Workflow
Start Camera
↓
Capture Photo
↓
Photo displayed in canvas
↓
User signs on photo
↓
Merged image generated
↓
Stored in localStorage
Analytics Dashboard

Displays the final verification results.

Audit Image

Displays the merged:

Photo + Signature
Salary Distribution Chart

A custom SVG bar chart is implemented without using any chart libraries.

Chart features:

Grid lines

Dynamic bar scaling

Responsive width

City labels

Salary labels

Salary is aggregated by city before rendering the chart.

Geospatial Mapping

Employee cities are displayed using Leaflet.

City coordinates are mapped using a predefined lookup table:

const cityCoords = {
  "Edinburgh": [55.9533, -3.1883],
  "Tokyo": [35.6762, 139.6503],
  "San Francisco": [37.7749, -122.4194],
  "London": [51.5074, -0.1278],
  "New York": [40.7128, -74.006],
  "Singapore": [1.3521, 103.8198],
  "Sidney": [-33.8688, 151.2093]
}

These coordinates are used to place markers on the map.

Intentional Vulnerability (Required by Assignment)
Bug Type

Memory leak caused by missing cleanup in ResizeObserver

Location
components/SalaryChart.jsx
Issue

A ResizeObserver is created to detect container resizing, but in one implementation the observer is not properly disconnected.

Example:

const resizeObserver = new ResizeObserver((entries) => {
  setDimensions(...)
})

resizeObserver.observe(containerRef.current)

Without cleanup:

resizeObserver.disconnect()

Multiple observers may accumulate during component lifecycle events.

Impact

Memory usage increases

Performance degradation during resizing

Potential unnecessary re-renders

Why This Bug Was Chosen

This bug demonstrates understanding of:

DOM observers

React lifecycle

Performance pitfalls in UI applications

It represents a real-world performance bug commonly found in dashboards.

Folder Structure
src
│
├── components
│   ├── Navbar.jsx
│   ├── Layout.jsx
│   ├── ProtectedRoute.jsx
│   ├── VirtualTable.jsx
│   ├── SalaryChart.jsx
│   └── SignatureCanvas.jsx
│
├── pages
│   ├── Login.jsx
│   ├── List.jsx
│   ├── Details.jsx
│   └── Analytics.jsx
│
├── context
│   └── AuthContext.jsx
│
├── utils
│   └── mergeImage.js
│
└── App.jsx
Installation

Clone the repository:

git clone <repo-url>

Install dependencies:

npm install

Run the project:

npm run dev
Hard Constraints Compliance
Requirement	Status
Zero UI Libraries	Implemented using Tailwind CSS
Custom Virtualization	Implemented manually
No Chart Libraries	Custom SVG chart
Native Camera API	Implemented
Signature Overlay	Canvas implementation
Persistent Auth	Context + localStorage
Intentional Bug	Documented
Author

Dilleswara Rao Nakkina
