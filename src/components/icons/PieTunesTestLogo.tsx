const PieTunesTestLogo = (props: preact.JSX.HTMLAttributes<SVGSVGElement>) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M368.552 226.21c6.647-1.336 12.925-1.933 19.274-1.192 5.27.616 9.238-1.243 12.514-5.541 5.97-7.833 13.101-14.394 23.228-16.194 8.82-1.568 17.877-1.62 25.9 2.677 14.015 7.505 25.076 4.998 36.077-6.465 18.534-19.313 56.472-18.837 75.055.12 1.864 1.902 3.979 3.557 5.851 5.45 6.867 6.94 14.722 8.306 23.796 4.854 5.414-2.06 10.68-4.469 16.538-5.475 14.416-2.477 26.659 1.557 35.926 12.528 12.418 14.7 8.288 11.462 26.502 11.659 18.068.195 32.03 7.662 41.958 22.751 3.648 5.546 5.355 11.776 6.605 18.177 2.555 13.084 10.394 20.86 23.484 23.247 11.672 2.129 22.32 6.125 31.204 14.491 10.806 10.177 16.057 22.63 16.802 37.209.17 3.325.115 6.666.037 9.997-.285 12.24 5.587 20.65 16.388 25.66 10.882 5.047 20.898 11.098 27.933 21.148 12.277 17.536 12.3 36.29 5.499 55.717-.988 2.822-2.003 5.638-2.852 8.503-2.308 7.796-.561 14.847 4.369 21.111 3.602 4.578 7.667 8.799 11.168 13.448 13.868 18.413 12.66 47.134-2.563 64.39-1.653 1.874-3.11 3.987-5.009 5.569-11.534 9.61-12.715 21.881-9.398 35.394 2.646 10.778 3.751 21.626 1.161 32.58-4.002 16.927-14.693 28.361-29.837 36.086-1.333.68-2.693 1.368-4.118 1.799-16.078 4.86-21.541 16.517-21.821 32.336-.357 20.214-9.423 35.726-27.28 45.676-6.317 3.52-13.23 5.547-20.375 6.387-12.464 1.464-19.923 7.948-22.55 20.397-2.059 9.752-6.14 18.572-13.756 25.513-9.608 8.755-21.034 12.456-33.749 12.9-2.328.081-4.669.034-6.996-.1-5.879-.338-10.577 1.51-14.427 6.258-8.666 10.689-19.76 16.678-33.859 16-6.249-.3-12.154-2.287-17.69-4.954-10.625-5.12-19.531-3.062-27.636 5.155-9.094 9.22-19.721 15.84-32.806 17.76-17.222 2.527-32.228-2.345-45.233-13.734-1.628-1.427-3.288-2.846-4.732-4.45-6.886-7.65-15.032-8.915-24.464-5.421-6.986 2.587-13.845 5.493-21.574 5.803-11.901.477-21.67-3.744-29.087-12.702-4.99-6.024-10.197-8.503-18.405-7.97-15.125.983-28.974-3.425-39.983-14.671-6.117-6.248-10.588-13.562-11.656-22.19-1.963-15.858-10.805-23.493-26.302-25.82-16.685-2.503-29.502-11.617-38.265-26.227-4.503-7.508-6.184-15.736-6.588-24.312-.165-3.492-.07-6.997-.085-10.496-.037-8.765-3.973-15.338-11.418-19.755-2.85-1.69-5.92-3.054-8.992-4.317-31.073-12.78-44.06-40.548-33.996-72.712 1.735-5.545 3.929-10.924 4.833-16.76 1.117-7.208-.444-13.54-4.739-19.276-1.495-1.996-3.078-3.963-4.853-5.708-21.461-21.092-24.132-56.549-.007-80.622 9.002-8.983 11.465-19.548 7.584-31.642-1.067-3.328-2.09-6.674-2.997-10.049-4.306-16.021-3.91-31.643 4.494-46.4 6.817-11.971 17.296-19.715 29.964-24.477 13.855-5.208 20.324-14.742 20.352-29.71.044-23.31 10.309-40.55 32.35-49.861 5.743-2.426 11.908-3.05 17.969-4.014 9.764-1.553 15.882-6.942 18.604-16.447 1.371-4.79 2.613-9.644 4.867-14.144 6.6-13.175 17.073-21.433 31.812-24.941m238.548 5.38c-4.055 1.517-8.113 3.027-12.165 4.552-14.948 5.623-28.692 4.38-40.82-6.906-4.75-4.42-9.453-8.978-14.688-12.769-8.914-6.455-18.634-7.301-28.812-2.712-7.387 3.33-12.205 9.699-18.062 14.819-11.51 10.06-24.334 12.287-38.588 7.197-4.077-1.456-8.125-2.991-12.203-4.444-11.02-3.926-15.62-2.792-22.063 7.032-7.842 11.958-17.625 16.862-32.226 13.436-15.207-3.57-26.624 4.837-30.183 20.346-5.057 22.032-17.636 33.074-40.126 35.224-15.558 1.488-24.375 8.103-27.378 20.572-.91 3.773-.518 7.63-.593 11.449-.452 23.24-10.98 39.584-32.82 48.29-4.336 1.727-8.553 3.735-12.392 6.44-9.472 6.675-13.174 15.828-11.874 27.24.685 6.014 2.656 11.668 4.492 17.357 6.76 20.95 3.847 39.722-12.205 55.669-1.765 1.753-3.308 3.75-4.823 5.732-8.942 11.702-9.092 24.04-.265 35.932 2.773 3.736 5.902 7.223 9.023 10.684 8.302 9.203 12.35 19.813 12.1 32.337-.197 9.9-3.226 18.91-6.604 27.987-6.851 18.405-.875 32.823 16.873 41.213 4.816 2.277 9.89 4.074 14.512 6.682 12.033 6.788 20.185 16.684 22.842 30.545 1.387 7.235 1.22 14.582 1.155 21.9-.036 4.143 1.19 7.827 3.108 11.417 5.055 9.466 13.646 13.37 23.619 14.688 12.807 1.693 24.122 5.884 32.603 16.294 5.704 7 8.045 15.177 9.718 23.738 3.068 15.701 14.76 24.22 30.256 20.574 13.8-3.247 23.807.655 31.237 12.336.446.7.997 1.336 1.53 1.975 5.207 6.237 10.521 7.829 18.232 5.305 3.637-1.19 7.194-2.621 10.8-3.91 15.761-5.635 30.104-4.132 42.345 8.313 2.801 2.848 5.74 5.578 8.779 8.17 7.554 6.442 16.21 8.868 26.042 6.88 7.283-1.474 12.386-6.263 17.29-11.29 9.844-10.09 21.006-16.899 35.841-15.16 7.88.924 14.95 4.497 22.432 6.715 8.663 2.568 13.122 1.113 18.633-6.19 1.004-1.33 1.915-2.728 2.896-4.075 6.755-9.276 15.942-12.692 27.119-11.101 20.86 2.97 29.686-2.874 34.868-23.166.535-2.093 1.16-4.163 1.762-6.239 1.762-6.075 5.243-11.025 9.648-15.513 8.644-8.805 19.771-11.049 31.321-12.47 13.038-1.606 21.687-9.832 24.607-22.708 1.053-4.648.629-9.28.836-13.919.77-17.206 7.992-30.64 22.887-39.72 5.45-3.323 11.648-4.915 17.275-7.825 12.91-6.675 18.4-17.35 15.92-31.686-1.046-6.056-2.659-12.015-3.644-18.079-2.753-16.928.547-32.085 13.422-44.352a96.15 96.15 0 0 0 7.84-8.393c8.232-9.979 8.694-23.358 1.058-33.744-2.555-3.473-5.583-6.612-8.532-9.777-9.34-10.028-13.853-21.578-12.426-35.493.85-8.283 4.11-15.738 6.601-23.466 5.746-17.818-.098-31.6-16.965-39.576a73.765 73.765 0 0 0-4.11-1.815c-20.629-8.256-32.591-27.907-30.556-52.044 1.486-17.62-7.54-29.415-24.804-32.986-7.478-1.546-15.143-2.591-21.889-6.568-13.267-7.822-21.243-19.258-23.924-34.514-1.78-10.123-6.978-17.99-16.806-22.021-7.119-2.92-14.514-1.286-21.714-.384-9.849 1.234-17.685-1.657-23.569-9.673-2.265-3.086-4.441-6.237-6.73-9.304-4.142-5.554-9.417-7.74-16.963-5.048z" /><path d="M589.288 260.61c78.403 22.552 135.477 70.697 173.623 141.802 14.55 27.124 23.182 56.34 27.097 86.747 5.746 44.622-.07 88.03-16.829 129.769-18.324 45.639-47.155 83.51-85.432 114.428-33.83 27.326-71.682 45.968-114.428 54.022-80.089 15.09-152.68-2.23-215.884-53.719-49.565-40.378-81.899-92.346-96.085-155.054-6.182-27.328-7.008-55.007-4.791-82.868 3.726-46.85 19.813-89.321 47.195-127.104 34.615-47.765 78.578-84.035 135.269-103.11 21.187-7.128 42.991-11.25 65.354-13.072 27.713-2.258 54.749 1.355 81.673 7.128.97.208 1.893.634 3.238 1.031M323.971 662.55c54.39 74.704 127.208 111.094 220.016 105.057 28.155-1.83 55.014-9.69 80.402-22 40.593-19.68 73.647-48.43 99.39-85.328 35.339-50.652 50.053-106.878 42.627-168.324-3.69-30.527-13.37-59.453-28.71-86.153-29.79-51.851-72.032-89.927-127.653-112.464-34.633-14.032-70.662-19.51-108.04-16.265-25.62 2.224-50.363 7.932-73.664 18.615-51.527 23.624-91.722 60.06-119.44 109.598-27.977 50.003-35.69 103.603-25.977 159.824 6.109 35.359 20.394 67.381 41.049 97.44z" /><path d="M473.853 438.35c2.288-4.678 6.31-6.38 10.548-7.46 29.163-7.432 58.353-14.758 87.531-22.128 8.549-2.16 17.056-4.493 25.64-6.496 11.05-2.579 15.784 1.186 15.79 12.51.027 57.984.062 115.967-.04 173.95-.042 23.847-20.056 44.87-43.875 45.282-14.832.257-27.025-6.156-34.091-19.679-7.34-14.045-5.223-29.966 4.519-41.09 11.445-13.067 28.077-17.3 44.42-11.321 1.226.449 2.49.794 3.65 1.16 2.137-1.835 1.681-4.118 1.684-6.207.036-28.5.048-56.998.026-85.498-.006-7.5-2.323-9.22-9.588-7.409a70130.333 70130.333 0 0 1-74.58 18.562c-7.775 1.93-9.205 3.595-9.22 11.713-.055 28.832.047 57.665-.105 86.497-.078 14.814-3.393 28.611-13.102 40.472-12.797 15.634-30.688 21.853-47.853 16.136-16.613-5.532-27.317-23.663-24.365-41.268 2.95-17.592 18.368-31.071 35.65-31.443 6.78-.145 13.263.662 19.455 3.55 4.991 2.326 5.771 1.935 5.811-3.67.163-22.664.097-45.33.264-67.994.128-17.488-.697-34.988.599-52.465.137-1.847.274-3.644 1.232-5.704zM678.946 417.747c6.483 3.115 8.488 8.68 5.2 15.612-5.153 10.86-14.006 18.002-24.79 22.874-3.8 1.716-7.717 3.136-12.004 3.057-7.567-.14-11.75-5.295-9.803-12.64 2.984-11.262 11.409-18.105 20.678-23.926 6.113-3.838 12.763-6.55 20.72-4.977zM397.792 484.441c-2.827 4.463-7.09 5.49-11.45 5.773-12.687.82-23.916-3.317-34.053-10.706-1.33-.97-2.473-2.239-3.56-3.493-3.222-3.72-3.98-8.068-2.42-12.617 1.553-4.529 5.566-6.19 9.836-6.554 14.336-1.219 27.004 3.148 37.769 12.575 4.343 3.803 6.878 8.638 3.878 15.022zM661.17 563.642c2.437-8 9.225-8.447 15.143-8.592 11.243-.276 22.192 1.85 31.918 8.084 5.812 3.724 8.315 8.504 6.9 13.717-1.538 5.662-6.341 7.476-11.39 8.348-12.84 2.217-24.794-.418-35.762-7.382-4.993-3.17-7.945-7.52-6.809-14.175zM671.356 521.078c-10.087-5.047-11.14-14.725-1.969-20.366 12.935-7.954 27.161-9.207 41.726-5.247 4.244 1.154 6.937 4.166 7.435 8.988.566 5.482-2.225 9.038-6.431 11.416-11.69 6.61-24.202 8.861-37.468 5.993-.973-.21-1.94-.447-3.293-.784zM335.821 573.743c-5.785-1.103-9.815-3.61-10.564-9.502-.72-5.672 2.233-9.494 6.744-12.348 11.734-7.425 24.767-8.194 38.024-6.882 4.633.46 8.581 3.055 9.842 8.039 1.26 4.986-1.059 8.74-4.897 11.666-11.544 8.796-24.712 10.822-39.149 9.027zM415.757 379.126c6.955 5.056 12.736 10.71 16.743 18.005.48.873 1.105 1.705 1.39 2.64 1.623 5.302 3.338 10.82-1.181 15.46-4.595 4.715-10.228 3.504-15.301 1.048-11.406-5.521-20.428-13.625-25.162-25.728-1.79-4.573-1.823-9.388 1.401-13.25 3.19-3.82 7.667-3.895 12.365-2.7 3.465.881 6.552 2.322 9.745 4.525zM533.939 358.461c-1.328 4.193-2.139 8.138-4.7 11.371-5.509 6.958-14.593 6.42-18.286-1.563-6.324-13.672-6.076-27.737-.69-41.656 1.843-4.762 5.771-7.116 11.047-6.946 5.167.166 8.302 3.07 10.104 7.572 4 9.987 4.56 20.305 2.525 31.222zM608.279 691.99c.111 2.074.29 3.736.26 5.394-.146 7.944-6.258 12.519-13.849 10.112-8.489-2.693-13.48-9.45-17.858-16.588-3.585-5.846-5.953-12.19-6.197-19.215-.162-4.657.817-8.829 5.192-11.021 4.323-2.166 8.854-1.516 12.76 1.272 8.93 6.374 15.112 14.854 18.538 25.298.464 1.416.754 2.889 1.154 4.748zM448.957 660.723c1.831-.875 3.285-1.72 4.847-2.238 8.45-2.796 14.255 1.296 14.492 10.143.338 12.606-13.017 32.09-24.776 36.146-8.058 2.78-13.888-.964-13.936-9.455-.086-14.93 7.81-25.644 19.373-34.596zM636.794 648.209c-4.299-4.247-8.144-8.34-9.57-14.13-1.765-7.172 2.07-12.746 9.338-13.358 13.26-1.117 33.139 13.008 36.468 25.912 2.073 8.036-2.083 13.662-10.357 13.66-10.306-.004-18.329-5.184-25.88-12.084zM534.153 692.19c-.308 7.8-1.293 14.994-4.784 21.634-2.264 4.305-5.705 7.197-10.592 7.138-4.913-.06-7.769-3.619-9.386-7.83-5.095-13.272-5.144-26.608.427-39.762 1.898-4.48 5.312-7.008 10.554-6.776 5.01.222 7.87 2.962 9.751 7.24 2.51 5.709 2.98 11.867 4.03 18.356z" /></svg>
    )
}

export default PieTunesTestLogo;