import { supabase } from "@/lib/supabase"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {

    try {

        const { searchParams } = new URL(req.url)

        const user_id = searchParams.get("user_id")
        const subscriber_id = searchParams.get("sub_id")
        
        const { data: existingSubscription, error: checkError } = await supabase
            .from('subscriptions')
            .select("*")
            .eq("user_id", user_id)
            .eq("subscriber_id", subscriber_id)
            .single()

        if (checkError) return NextResponse.json({ error: checkError, status: 400 })

        return NextResponse.json({ existingSubscription })
    } catch (e) {
        return NextResponse.json({ error: "Failed checking subscription", details: e instanceof Error ? e.message : String(e) }, { status: 500 })
    }

}

export async function POST(req: NextRequest) {

    try {

        const body = await req.json()

        const { data: newSubscription, error: subError } = await supabase
            .from("subscriptions")
            .insert({
                user_id: body.user_id,
                subscriber_id: body.sub_id
            })
            .select()
            .single()

        if (subError) return NextResponse.json({ error: subError }, { status: 400 })

        return NextResponse.json({ newSubscription })
    } catch (e) {
        return NextResponse.json({ error: "Failed making subscription", details: e instanceof Error ? e.message : String(e) }, { status: 500 })
    }

}