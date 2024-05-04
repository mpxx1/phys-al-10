import './App.css'
import {useEffect, useRef, useState} from "react"


function App() {
    const [wavelength, setWavel] = useState("")
    const [rIndex1, setRIndex1] = useState("")
    const [rIndex2, setRIndex2] = useState("")
    const [slotsDist, setSlotsDist] = useState("")
    const [screenDist, setScreenDist] = useState("")

    const wl = Number.parseFloat(wavelength)
    const ri1 = Number.parseFloat(rIndex1)
    const ri2 = Number.parseFloat(rIndex2)
    const r = ri2 / ri1
    const sld = Number.parseFloat(slotsDist)
    const scd = Number.parseFloat(screenDist)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const arr: number[] = []

    if (ri1 < 1 || ri2 < 1)
        alert("Refractive index must be >= 1")

    if (wl <= 0)
        alert("Wavelength must be greater than 0")

    if (sld <= 0 || scd <= 0)
        alert("Distance between slots and distance to screen must be greater than 0")

    if (sld >= scd)
        alert("Slots distance is grater or equal to screen distance, please make slots distance smaller")

    for (let t = -100; t < 100; t += 0.1) {
        arr.push(
            4 * Math.cos(Math.PI * r * sld * t / (wl * Math.pow(10, -9) * scd)) *
            Math.cos(Math.PI * r * sld * t / (wl * Math.pow(10, -9)  * scd))
        )
    }

    useEffect(() => {
        if (canvasRef.current == null)
            alert("Your browser does not support canvas, update it or use modern one to see the result")
        else
            for (let i = 0; i < arr.length; ++i) {
                const clr = 255 * (1 - arr[i] / 4)
                const ctx = canvasRef.current.getContext("2d")
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ctx.fillStyle = `rgb(${clr}, ${clr}, ${clr})`
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ctx.fillRect(i, 0, 1, 500)
            }

    }, [arr, canvasRef, r, scd, sld, wl]);


    return (
        <div className={"wrapper"}>
            <div className={"inputWrapper"}>
                <label> Enter values to see interference pattern </label>

                <div>
                    <input
                        placeholder={"Wavelength, nm"}
                        value={wavelength}
                        onChange={(event) => setWavel(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Refractive index 1"}
                        value={rIndex1}
                        onChange={(event) => setRIndex1(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Refractive index 2"}
                        value={rIndex2}
                        onChange={(event) => setRIndex2(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Distance between slots, m"}
                        value={slotsDist}
                        onChange={(event) => setSlotsDist(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        placeholder={"Distance to screen, m"}
                        value={screenDist}
                        onChange={(event) => setScreenDist(event.target.value)}
                    />
                </div>
            </div>

            <div className={"canvasWrapper"}>
                <label> Visualization of the interference pattern. Young's experiment </label>
                <canvas ref={canvasRef} height={700} width={1200}/>
            </div>
        </div>
    )
}

export default App
