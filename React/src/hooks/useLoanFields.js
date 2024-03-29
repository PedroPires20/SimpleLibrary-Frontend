import { useState, useEffect } from "react";
import NetworkClient from "@common/utils/network_client";

const DEFAULT_FIELD_STATE = { loading: true, error: false, fieldData: [] };


export function useLoanFields() {
    const [readers, setReaders] = useState(DEFAULT_FIELD_STATE);
    const [bookTitles, setBookTitles] = useState(DEFAULT_FIELD_STATE);
    const api = new NetworkClient(API_BASE_URL);

    async function loadLoanFields() {
        try {
            let readersData = await api.fetchLoanFieldValues("reader");
            setReaders({
                loading: false,
                error: false,
                fieldData: readersData.filter((value) => value && value !== "")
            });
        }catch(exception) {
            setReaders({ loading: false, error: exception.message || true });
        }
        try {
            let titlesData = await api.fetchLoanFieldValues("bookTitle");
            setBookTitles({
                loading: false,
                error: false,
                fieldData: titlesData.filter((value) => value && value !== "")
            });
        }catch(exception) {
            setBookTitles({ loading: false, error: exception.message || true });
        }
    }

    useEffect(() => {
        loadLoanFields();
    }, []);

    function refreshLoanFields() {
        setReaders(DEFAULT_FIELD_STATE);
        setBookTitles(DEFAULT_FIELD_STATE);
        loadLoanFields();
    }

    return { readers, bookTitles, refreshLoanFields };
}
