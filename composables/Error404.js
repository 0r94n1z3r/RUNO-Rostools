/* 
    <script setup>
        const event  = useRequestEvent();

        ...

            if(someErrorCondition){
                throw Error404(event);
            }
        ...
    </script>
*/

export const Error404 = (event, message = 'Resource not found')=>{
    // setResponseStatus(event, 404);
    return showError({
        statusCode: 404,
        statusMessage: message,
        fatal: false,
    });
}