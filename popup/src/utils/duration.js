import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

export function humanizeDuration(milliseconds) {
  return moment
    .duration(milliseconds, "milliseconds")
    .format("y [years], w [weeks], d [days], hh:mm:ss", {
      largest: 4,
      trim: false
    });
}
