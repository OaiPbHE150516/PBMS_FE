import React from "react";

export function FormErrorMessage({
    errors, fieldName, defaultMessage,
}) {
    const messageError = errors?.[fieldName];
    const message = (messageError ?? {}).message || defaultMessage;
    return messageError ? <small className="text-danger">{message}</small> : null;
}
