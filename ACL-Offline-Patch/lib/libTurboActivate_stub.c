/*
 * libTurboActivate.so stub replacement
 * Bypasses all license checks for offline ACL activation
 *
 * Compile for ARM with:
 * arm-linux-gnueabi-gcc -shared -fPIC -o libTurboActivate.so libTurboActivate_stub.c
 */

#include <stdint.h>
#include <string.h>

/* TurboActivate return codes */
#define TA_OK                       0
#define TA_FAIL                     1
#define TA_E_PKEY                   2
#define TA_E_ACTIVATE               3
#define TA_E_INET                   4
#define TA_E_INUSE                  5
#define TA_E_REVOKED                6
#define TA_E_PDETS                  15

typedef uint32_t HRESULT;

/* GENUINE_OPTIONS structure - size must be 16 bytes */
typedef struct {
    uint32_t nSize;                  /* Must be 16 */
    uint32_t nFlags;                 /* Input flags */
    uint32_t nDaysLeft;              /* Output: days remaining */
    uint32_t nGracePeriodDaysLeft;   /* Output: grace period days */
} GENUINE_OPTIONS;

/* Product details - just store path, do nothing */
static char g_pdets_path[256] = {0};

/* PDetsFromPath - Load product details (stub: just save path) */
HRESULT PDetsFromPath(const char* path) {
    if (path) {
        strncpy(g_pdets_path, path, sizeof(g_pdets_path) - 1);
    }
    return TA_OK;
}

/* IsActivated - Always return activated */
HRESULT IsActivated(void) {
    return TA_OK;
}

/* IsGenuine - Always return genuine */
HRESULT IsGenuine(void) {
    return TA_OK;
}

/* IsGenuineEx - Takes handle and options structure pointer */
HRESULT IsGenuineEx(void* handle, GENUINE_OPTIONS* opts) {
    if (opts) {
        opts->nDaysLeft = 9999;
        opts->nGracePeriodDaysLeft = 9999;
    }
    return TA_OK;
}

/* Activate - Always succeed */
HRESULT Activate(void) {
    return TA_OK;
}

/* ActivateEx - Always succeed */
HRESULT ActivateEx(const char* extra) {
    return TA_OK;
}

/* Deactivate - Always succeed */
HRESULT Deactivate(void) {
    return TA_OK;
}

/* CheckAndSavePKey - Always accept any key */
HRESULT CheckAndSavePKey(const char* productKey) {
    return TA_OK;
}

/* UseTrial - Always succeed */
HRESULT UseTrial(void) {
    return TA_OK;
}

/* TrialDaysRemaining - Return lots of days */
HRESULT TrialDaysRemaining(uint32_t* daysRemaining) {
    if (daysRemaining) *daysRemaining = 9999;
    return TA_OK;
}

/* IsDateValid - Always valid */
HRESULT IsDateValid(void) {
    return TA_OK;
}

/* GetFeatureValue - Return empty string */
HRESULT GetFeatureValue(const char* featureName, char* value, uint32_t* valueLen) {
    if (value && valueLen && *valueLen > 0) {
        value[0] = '\0';
    }
    return TA_OK;
}

/* ExtendTrial - Always succeed */
HRESULT ExtendTrial(const char* trialExtension) {
    return TA_OK;
}

/* GetPKey - Return dummy key */
HRESULT GetPKey(char* productKey, uint32_t* keyLen) {
    const char* dummy = "XXXX-XXXX-XXXX-XXXX";
    if (productKey && keyLen) {
        strncpy(productKey, dummy, *keyLen);
    }
    return TA_OK;
}

/* SetCustomActDataPath - Accept any path */
HRESULT SetCustomActDataPath(const char* path) {
    return TA_OK;
}

/* GracePeriodDaysRemaining - used by some versions */
HRESULT GracePeriodDaysRemaining(uint32_t* daysRemaining) {
    if (daysRemaining) *daysRemaining = 9999;
    return TA_OK;
}
