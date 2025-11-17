import { useEffect } from "react";

export default function SEOHead({ title, description, keywords }) {
    useEffect(() => {
        if (title) {
            document.title = title;
        }

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }
        if (description) {
            metaDescription.setAttribute("content", description);
        }

        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement("meta");
            metaKeywords.name = "keywords";
            document.head.appendChild(metaKeywords);
        }
        if (keywords) {
            metaKeywords.setAttribute("content", keywords);
        }
    }, [title, description, keywords]);

    return null; 
}