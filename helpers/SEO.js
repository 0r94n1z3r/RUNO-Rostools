export const SEO_title = (title) => 
    seo(title, 'meta_title', 'RosTools')

export const SEO_description = (description) =>  
    seo(description, 'meta_description', 'RosTools')

const seo = (value, key, fallback) => value || fallback;