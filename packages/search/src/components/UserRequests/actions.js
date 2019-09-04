import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
const windowGlobal = typeof window !== 'undefined' && window

//  flow dialog actions
export function toggleLocationRequestDialog(toggle) {
    return {type: types.TOGGLE_LOC_REQUEST_DIALOG, toggle}
}



export function toggleNotifyDialog(toggle) {
    if (toggle === false && windowGlobal) {
        windowGlobal.clearTimeout(windowGlobal.notifyDialogTimeoutId);
    }

    return { type: types.TOGGLE_NOTIFY_DIALOG, toggle }
}

export function toggleFeedbackDialog(toggle) {
    return { type: types.TOGGLE_FEEDBACK_DIALOG, toggle }
}

export function slowToggleNotifyDilog() {
    return async (dispatch, getState) => {
        if (windowGlobal) {
            windowGlobal.notifyDialogTimeoutId = windowGlobal.setTimeout(function () {
                const { showFeedbackDialog } = getState().searchPage;

                if (showFeedbackDialog) {
                    return
                } else {
                    dispatch(toggleNotifyDialog(true))
                }
            }, 21000);
        }
    }
}

