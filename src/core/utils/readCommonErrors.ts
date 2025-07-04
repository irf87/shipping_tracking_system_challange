export function extractAxiosErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as { response?: unknown }).response === 'object' &&
    (error as { response?: { data?: unknown } }).response?.data
  ) {
    const responseData = (error as { response: { data: unknown } }).response.data;

    if (typeof responseData === 'object' && responseData !== null && 'error' in responseData) {
      const errorData = (responseData as { error?: unknown }).error;
      if (typeof errorData === 'string') {
        return errorData;
      }
    }
    
    if (
      typeof responseData === 'object' && 
      responseData !== null && 
      'error' in responseData &&
      typeof (responseData as { error?: unknown }).error === 'object' &&
      (responseData as { error?: { message?: string } }).error?.message
    ) {
      return (responseData as { error: { message: string } }).error.message;
    }
  }
  return '';
}

export function readCommonErrors(error: unknown): string {
  const axiosMsg = extractAxiosErrorMessage(error);
  if (axiosMsg) return axiosMsg;
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
}
