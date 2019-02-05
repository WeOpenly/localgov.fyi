import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

const SvgLeak = props => (
    <SvgIcon
        height={512}
        viewBox="0 0 480 480"
        width={512}
        data-lt-installed="true"
        {...props}>
            <linearGradient id="grad1">
               <stop offset="0%" stop-color="#a0a2fc"/>
                  <stop offset="100%" stop-color="#5a4aff"  />
        </linearGradient>
        <g fill="#9bc9ff">
            <path
                d="M320 192c-8.836 0-16-7.164-16-16v-40H176v40c0 8.836-7.164 16-16 16h-24v128h88.055L224 272l40 48h80V192zm0 0M176 8h128v64H176zm0 0M8 192h64v128H8zm0 0M408 192h64v128h-64zm0 0M136 176h-32v160h32zm0 0M104 160H72v192h32zm0 0M344 176v160h32V176zm0 0M408 160h-32v192h32zm0 0M320 136v-32H160v32zm0 0M336 104V72H144v32zm0 0"
                data-original="#000000"
                className="leak_svg__active-path"
                data-old_color="#ffffff"
                fill="#fff"/>
        </g>
        <path
            d="M240 480c-26.5-.027-47.973-21.5-48-48 0-23.895 37.176-78.398 41.414-84.543l6.586-9.535 6.586 9.535C250.824 353.602 288 408.105 288 432c-.027 26.5-21.5 47.973-48 48zm0-113.602c-14.398 22.196-32 53.313-32 65.602 0 17.672 14.328 32 32 32s32-14.328 32-32c0-12.297-17.602-43.414-32-65.602zm0 0"
            fill="url(#grad1)"
            data-original="#1E81CE"
            data-old_color="#0e07ce"/>
        <path
            d="M480 184h-64v-32h-48v16h-32v16h-16a8 8 0 0 1-8-8v-32h16v-32h16V64h-32V0H168v64h-32v48h16v32h16v32a8 8 0 0 1-8 8h-16v-16h-32v-16H64v32H0v144h64v32h48v-16h32v-16h88.063v-33.871L260.245 328H336v16h32v16h48v-32h64zM184 16h112v48H184zm-32 64h176v16H152zm16 32h144v16H168zM16 312V200h48v112zm64 32V168h16v176zm32-16V184h16v144zm155.754-16L216 249.871l.047 62.129H144V200h16c13.254 0 24-10.746 24-24v-32h112v32c0 13.254 10.746 24 24 24h16v112zM352 328V184h16v144zm48 16h-16V168h16zm64-32h-48V200h48zm0 0"
           fill="url(#grad1)"
            data-original="#1E81CE"
            data-old_color="#0e07ce"/>
    </SvgIcon>
);

export default SvgLeak;