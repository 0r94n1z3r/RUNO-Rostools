<template>
    <div v-if="html" class="parsed-html" v-html="parsedHTML"/>
</template>

<script setup>
    const props = defineProps({
        html: String
    })

    const parsedHTML = computed(()=>
        {
            if(!props.html)return null;

            let resHTML = props.html + '';

            const phoneRegex = /((\(|\+7|\b8)[ ]?(\(?\d{3,4}\)?[\- ]?)[\d\- ]{6,9}\d)/g;
            const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi;

            const insideAnchor = (html, i) => html.lastIndexOf('<a', i) > html.lastIndexOf('</a>', i);
            
            resHTML = resHTML
            .replace(/style="[^"]*"/g, '')
            .replace(phoneRegex, (match, ...args) => {
                const offset = args.at(-2), html = args.at(-1);
                if (insideAnchor(html, offset)) return match; 
                const txt = match.trim();
                const digits = txt.replace(/\D/g, '');
                const tel = txt.startsWith('+7')
                ? `+${digits}`
                : txt.startsWith('8')
                ? `+7${digits.slice(1)}`
                : `+7${digits}`;

                return `<a href="tel:${tel}">${match}</a>`;
            })
            .replace(emailRegex, (match, ...args) => {
                const offset = args.at(-2), html = args.at(-1);
                if (insideAnchor(html, offset)) return match;
                return `<a href="mailto:${match}">${match}</a>`;
            });

            resHTML = addClassToHTML(resHTML, "text-link");

            resHTML = resHTML

            return resHTML;        
        }
    );

    const addClassToHTML = (html, theClass) => {
        const anchorRegex = /<a\b(?![^>]*\bclass=)[^>]*>|<a\b[^>]*\bclass\s*=\s*(['"])(.*?)\1[^>]*>/gi;
        
        const addClass = match => {
            if (match.includes('class=')) {
                return match.replace(/class\s*=\s*(['"])(.*?)\1/, `class="$1$2 ${theClass}$1`);
            } else {
                return match.replace(/<a\b/, `<a class="${theClass}"`);
            }
        };

        return html.replace(anchorRegex, addClass);
    };

</script>

<style lang="scss">
    .parsed-html{   
        *{
            background-color: transparent !important;
        }

        h1,
        h2,
        h3,
        h4,
        h5{
            margin-top: 4rem;
            margin-bottom: 2.4rem;
        }

        @include font-p2;
        h1{@include font-h3;}
        h2{@include font-h3;}
        h3{@include font-h3;}
        h4{@include font-h4;}
        h5{@include font-h4;}

        p{
            margin-bottom: .2em;
        }

        strong{
            font-weight: 700;
        }

        ul, ol{
            margin-left: 10pt;
            margin-bottom: 1rem;
            margin-top: -.8rem;

            li{
                margin-left: 15pt;
            }
        }

        ul{
            list-style: none;
            list-style-type: disc;
        }

        iframe, img{
            max-width: 100%;
            border-radius: .6rem;
            height: auto;
            margin-bottom: .2em;
        }

        table, tr, td{
            border: 1px solid black;
            border-collapse: collapse;

            p{
                margin: 0;
            }
        }

        td{
            padding: 4px 8px;
        }

        @include mobile{
            @include font-p3; 
        }

        // @media (max-width: $mobile) {
            
        // }
    }
</style>