// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

// @ts-ignore
export const useFetching = (callback, sort) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // @ts-ignore
    const fetching = async (...args) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (error) {
            // @ts-ignore
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return [fetching, isLoading, error];
};

// @ts-ignore
export const useObserver = (ref, canLoad, isLoading, callback) => {
    const observer = useRef();
    useEffect(() => {
        if (isLoading) return;
        // @ts-ignore
        if (observer.current) observer.current.disconnect();
        // @ts-ignore
        var cb = function (entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                callback();
            }
        };
        // @ts-ignore
        observer.current = new IntersectionObserver(cb);
        // @ts-ignore
        observer.current.observe(ref.current);
    }, [isLoading]);
};

// @ts-ignore
export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
        return posts;
    }, [sort, posts]);
    return sortedPosts;
};

// @ts-ignore
export const usePosts1 = (objs, type, result, isAnswer, search) => {
    // @ts-ignore
    const objects = Object.entries(objs[type]);
    // @ts-ignore
    let sortedAndSearchedPosts = objects.filter((obj) =>
        // @ts-ignore
        obj["1"]["Результат"].includes(result)
    );
    if (isAnswer) {
        sortedAndSearchedPosts = sortedAndSearchedPosts.filter((obj) =>
            // @ts-ignore
            obj["1"]["Ответ"].toLowerCase().includes(search.toLowerCase())
        );
    } else {
        sortedAndSearchedPosts = sortedAndSearchedPosts.filter((obj) =>
            // @ts-ignore
            obj["1"]["Вопрос"].toLowerCase().includes(search.toLowerCase())
        );
    }
    // @ts-ignore
    return sortedAndSearchedPosts;
};

// @ts-ignore
export const usePosts2 = (objs, search: string) => {
    if (objs.length < 1) {
        return [];
    }
    // @ts-ignore
    const objects = Object.entries(objs);
    // @ts-ignore
    return objects.filter((obj: dict) =>
        // @ts-ignore
        obj["1"]["Зона разгрузки"].toLowerCase().includes(search.toLowerCase())
    );
};

export const useSelectorCustom1 = (slice: any) => {
    // @ts-ignore
    return useSelector((state) => state[slice.name]);
};

// @ts-ignore
export const useSelectorCustom2 = (constant={data: string}) => {
    const storeConstant = constant.data.split("_")[0];
    // @ts-ignore
    return useSelector((state) => state[storeConstant]);
};

// @ts-ignore
export const useStateCustom1 = (initialState) => {
    // @ts-ignore
    const [variable, setVariable] = useState({ ...initialState });
    function setDefault() {
        // @ts-ignore
        setVariable({ ...initialState });
    }
    return [variable, setVariable, setDefault];
};

// @ts-ignore
export const useObserverCustom1 = ({
                                       // @ts-ignore
                                       observeTargetUseRef,
                                       canLoad = false,
                                       isLoading = false,
                                       // @ts-ignore
                                       callbackIntersecting,
                                   }) => {
    const observer = useRef();
    useEffect(() => {
        if (isLoading) {
            return undefined;
        }
        if (observer.current) {
            // @ts-ignore
            observer.current.disconnect();
        }
        // @ts-ignore
        observer.current = new IntersectionObserver(function (entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                callbackIntersecting();
            }
        });
        // @ts-ignore
        observer.current.observe(observeTargetUseRef.current);
    }, [isLoading]);
};

// @ts-ignore
export const useFetchingCustom1 = (callback) => {
    const [isFetchLoading, setIsFetchLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    // @ts-ignore
    const fetchFunction = async (...args) => {
        try {
            setIsFetchLoading(true);
            await callback(...args);
        } catch (error) {
            // @ts-ignore
            setFetchError(error.message);
        } finally {
            setIsFetchLoading(false);
        }
    };
    return [fetchFunction, isFetchLoading, fetchError];
};

// @ts-ignore
export const useDispatchCustom1 = (callback) => {
    const dispatch = useDispatch();
    return async function () {
        dispatch(callback);
    };
};

// @ts-ignore
export const useDispatchResetCustom1 = (constant, dispatch) => {
    const storeConstant = useSelectorCustom1(constant);
    return dispatch({ type: storeConstant.reset });
    // const dispatch = useDispatch();
    //
    // console.log("useDispatchCustom1: ", callback);
    //
    // return async function () {
    //   dispatch(callback);
    // };
};

// @ts-ignore
export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);
    const sortedAndSearchedPosts = useMemo(() => {
        // @ts-ignore
        return sortedPosts.filter((post) =>
            post.title.toLowerCase().includes(query)
        );
    }, [query, sortedPosts]);

    // @ts-ignore
    return sortedAndSearchedPosts;
};
