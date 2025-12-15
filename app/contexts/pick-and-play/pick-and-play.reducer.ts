export interface PickAndPlayState {
  step: 1 | 2 | 3;
}
export type PickAndPlayAction =
  | { type: "RESET" };

export const initialState: PickAndPlayState = {
  step: 1,
};


export function pickAndPlayReducer(state: PickAndPlayState, action: PickAndPlayAction): PickAndPlayState {
    switch (action.type) {
        case "RESET":
            return initialState;
        default:
            return state;
    }
}