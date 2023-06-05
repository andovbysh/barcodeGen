import {computed} from "vue";

export function useQueryGenerator(queryOptions, queryExtension) {

    const query = computed(() => {
        const extension = `image.${queryExtension}?`;

        const filteredOptions = Object.entries(queryOptions).filter(option => option[1] !== '')
        const options = filteredOptions.reduce((str, [key, val]) => {
            return `${str}${key}=${val}&`
        }, '')

        return `${extension}${options.slice(0, -1)}`;
    })

    return query;
}