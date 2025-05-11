import { createClient } from "@/lib/supabase"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const supabase = createClient()

        const body = await req.json()

        if (body.type === "init") {
            // Initialization

            const { data: newUser, error: initError } = await supabase
                .from("users")
                .insert({
                    tg_id: body.tg_id,
                })
                .select()
                .single()
                
            if (initError) return NextResponse.json({ error: "Failed initializing user", details: initError instanceof Error ? initError.message : String(initError) }, { status: 400 })
                
            return NextResponse.json({ newUser }) 
        } else {
            // Updating

            const { data: updatedUser, error: updateError } = await supabase
                .from("users")
                .update(body)
                .eq("tg_id", body.tg_id)
                .select()
                .single()
            
            if (updateError) return NextResponse.json({ error: "Failed updating user", details: updateError instanceof Error ? updateError.message : String(updateError) }, { status: 400 })
            
            return NextResponse.json({ updatedUser }) 
        }
    } catch (e) {
        return NextResponse.json({ error: "Failed managing user", details: e instanceof Error ? e.message : String(e) }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {

    try {
        const supabase = createClient()

        const { searchParams } = new URL(req.url)

        const tg_id = searchParams.get("id")

        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select("*")
            .eq("tg_id", tg_id)
            .single()

        if (checkError) return NextResponse.json({ error: checkError.message, status: 400 })

        return NextResponse.json({ existingUser })
    } catch (e) {
        return NextResponse.json({ error: "Failed checking user", details: e instanceof Error ? e.message : String(e) }, { status: 500 })
    }

}